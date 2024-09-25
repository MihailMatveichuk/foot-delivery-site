import { Module } from '@nestjs/common';
import { UsersService } from './users.service';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../../prisma/prisma-service';
import { UsersController } from './users.controller';
import { EmailModule } from './email/email.module';
import { EmailService } from './email/email.service';

@Module({
  imports: [EmailModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [UsersController],
  providers: [
    UsersService,
    ConfigService,
    JwtService,
    PrismaService,
    EmailService,
  ],
})
export class UsersModule {}
