import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'List platform users with roles and departments' })
  findAll() {
    return this.usersService.getUsers();
  }

  @Get('profile')
  @ApiOperation({ summary: 'Get a compact profile for a username' })
  getProfile(@Query('username') username: string) {
    return this.usersService.getProfile(username);
  }
}
