import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Post()
  async create() {
    return this.usersService.createNewUser();
  }

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.usersService.getAllUsers(page, limit);
  }

  @Get(':id')
  async getUser(@Param() params: any) {
    return this.usersService.getUser(params.id);
  }
}
