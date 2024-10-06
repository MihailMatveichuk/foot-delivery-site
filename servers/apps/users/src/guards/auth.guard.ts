import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../../../prisma/prisma-service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const accessToken = request.headers.access_token as string;
    const refreshToken = request.headers.refresh_token as string;

    if (!accessToken || !refreshToken) {
      throw new UnauthorizedException('Please login first');
    }

    if (accessToken) {
      try {
        const decodedToken = this.jwtService.verify(accessToken, {
          secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
        });

        if (!decodedToken) {
          throw new UnauthorizedException('Invalid access token');
        }

        return true;
      } catch (error) {
        if (error?.name === 'TokenExpiredError') {
          await this.updateAccessToken(request);
          return true;
        }
        return false;
      }
    }
  }

  private async updateAccessToken(request: any): Promise<void> {
    try {
      const refreshTokenData = request.headers.refresh_token as string;

      const decodedToken = this.jwtService.verify(refreshTokenData, {
        secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
      });

      if (!decodedToken) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const user = await this.prisma.user.findUnique({
        where: {
          id: decodedToken.id,
        },
      });

      const accessToken = this.jwtService.sign(
        {
          id: user.id,
        },
        {
          secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
          expiresIn: '15m',
        },
      );

      const refreshToken = this.jwtService.sign(
        {
          id: user.id,
        },
        {
          secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
          expiresIn: '7d',
        },
      );

      request.headers.access_token = accessToken;
      request.headers.refresh_token = refreshToken;
      request.user = user;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
