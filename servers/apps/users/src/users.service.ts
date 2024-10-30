import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, RegisterDto } from './dto/user.dto';
import { PrismaService } from '../../../prisma/prisma-service';
import { IUserData } from '../types/index';
import { EmailService } from './email/email.service';
import * as bcrypt from 'bcrypt';
import { TokenSender } from './utils/sendToken';

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
      isActive: dto.isActive,
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
    const activationCode = Math.floor(1000 + Math.random() * 900).toString();

    const token = this.jwtService.sign(
      {
        user,
        activationCode,
      },
      {
        secret: this.configService.get<string>('ACTIVATION_SECRET'),
        expiresIn: '5m',
      },
    );

    return { token, activationCode };
  }

  async activationUser(user: IUserData) {
    const { name, password, email, phone_number, address } = user;

    const existedUser = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!existedUser) {
      throw new BadRequestException('User has not already exists');
    }

    await this.prisma.user.update({
      where: {
        email,
      },
      data: {
        name,
        password,
        phone_number,
        address,
        isActive: true,
      },
    });

    return { message: 'User has been activated' };
  }

  async login(dto: LoginDto): Promise<any> {
    const { password, email } = dto;
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const isPasswordIsValid = await bcrypt.compare(password, user.password);

    if (!isPasswordIsValid) {
      throw new BadRequestException('Password is not valid');
    }

    const tokenSender = new TokenSender(this.jwtService, this.configService);

    return await tokenSender.sendToken(user);
  }

  async getAllUsers(req: any): Promise<any> {
    const users = await this.prisma.user.findMany({});
    const { access_token, refresh_token } = req.headers;
    if (access_token && refresh_token) {
      return { users, access_token, refresh_token };
    }
  }

  async logout(req: any) {
    req.access_token = null;
    req.refresh_token = null;
  }
}
