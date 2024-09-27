import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions, JwtService } from '@nestjs/jwt';
import { ActivationDto, LoginDto, RegisterDto } from './dto/user.dto';
import { PrismaService } from '../../../prisma/prisma-service';
import { IUserData } from '../types/index';
import { EmailService } from './email/email.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
  ) {}

  async register(dto: RegisterDto) {
    const user = {
      name: dto.name,
      email: dto.email,
      password: dto.password,
      phone_number: dto.phone_number,
      address: dto.address,
    };

    const activationToken = await this.createActivationToken(user);

    const { activationCode } = activationToken;

    await this.emailService.sendMail({
      email: dto.email,
      name: dto.name,
      subject: 'Activate your account',
      template: './activation-mail',
      activationCode,
    });

    await this.prisma.user.create({
      data: user,
    });

    return { activationToken, user };
  }

  async createActivationToken(user: IUserData) {
    const activationCode = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();

    const token = this.jwtService.sign(
      {
        user,
        activationCode,
      },
      {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: '5m',
      },
    );

    return { token, activationCode };
  }

  async activationUser(dto: ActivationDto) {
    const { activationCode, activationToken } = dto;

    const newUser: { user: IUserData; activationCode: string } =
      this.jwtService.verify(activationToken, {
        secret: this.configService.get<string>(
          'ACTIVATION_SECRET',
        ) as JwtModuleOptions as string,
      });

    if (newUser.activationCode !== activationCode) {
      throw new BadRequestException('Activation code is not valid or expired');
    }
    const { name, password, email, phone_number, address } = newUser.user;

    const existedUser = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existedUser) {
      throw new BadRequestException('User already exists');
    }

    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password,
        phone_number,
        address,
      },
    });

    return { user };
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
