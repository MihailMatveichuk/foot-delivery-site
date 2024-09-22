import { Module } from '@nestjs/common';
import { UsersService } from './users.service';

import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../../prisma/prisma-service';
import { UsersController } from './users.controller';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService, ConfigService, JwtService, PrismaService],
})
export class UsersModule {}
