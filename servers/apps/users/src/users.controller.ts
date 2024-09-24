import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterDto } from './dto/user.dto';
import { PrismaService } from '../../../prisma/prisma-service';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    const isEmailExisted = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    const isPhoneExisted = await this.prisma.user.findUnique({
      where: {
        phone_number: dto.phone_number,
      },
    });

    if (isEmailExisted) {
      throw new BadRequestException('User with this email has already existed');
    }

    if (isPhoneExisted) {
      throw new BadRequestException(
        'User with this phone number has already existed',
      );
    }

    if (!dto.email || !dto.name || !dto.password || !dto.phone_number) {
      throw new BadRequestException('Please fill the fields');
    } else {
      const hashedPassword = await bcrypt.hash(
        dto.password,
        await bcrypt.genSalt(10),
      );

      return await this.usersService.register({
        ...dto,
        password: hashedPassword,
      });
    }
  }

  @Get()
  async getAllUsers() {
    return await this.usersService.getAllUsers();
  }
}
