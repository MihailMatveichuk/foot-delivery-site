import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { RegisterResponse } from './types/user.types';
import { RegisterDto } from './dto/user.dto';
import { BadRequestException } from '@nestjs/common';
import { User } from './entities/user.entity';

@Resolver('User')
export class UserResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => RegisterResponse)
  async register(
    @Args('registerInput') dto: RegisterDto,
  ): Promise<RegisterResponse> {
    if (!dto.email || dto.name || dto.password) {
      throw new BadRequestException('Please fill the fields');
    } else {
      const user = await this.usersService.register(dto);
      return { user };
    }
  }

  @Query(() => [User])
  async getAllUsers() {
    return await this.usersService.getAllUsers();
  }
}
