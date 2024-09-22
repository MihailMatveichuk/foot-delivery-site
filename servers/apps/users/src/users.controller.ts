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

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly prisma: PrismaService,
  ) {}

  @Post('register')
  async register(@Body() dto: RegisterDto): Promise<RegisterDto | any> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (user) {
      throw new BadRequestException('User already exists');
    }
    if (!dto.email || !dto.name || !dto.password) {
      throw new BadRequestException('Please fill the fields');
    } else {
      return await this.usersService.register(dto);
    }
  }

  @Get()
  async getAllUsers() {
    return await this.usersService.getAllUsers();
  }
}
