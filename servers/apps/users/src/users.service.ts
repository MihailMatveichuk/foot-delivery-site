import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, RegisterDto } from './dto/user.dto';
import { PrismaService } from '../../../prisma/prisma-service';

@Injectable()
export class UsersService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async register(dto: RegisterDto): Promise<RegisterDto> {
    const data = { ...dto };
    await this.prisma.user.create({ data });

    return data;
  }

  async login(dto: LoginDto): Promise<any> {
    const { password, email } = dto;

    const user = {
      password,
      email,
    };

    return user;
  }

  async getAllUsers() {
    const users = await this.prisma.user.findMany({});
    return users;
  }
}
