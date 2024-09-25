import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, RegisterDto } from './dto/user.dto';
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

    const activationCode = activationToken.activationCode;

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

    return { activationCode, user };
  }

  async createActivationToken(user: IUserData) {
    const activationCode = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();

    const token = await this.jwtService.sign(
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
