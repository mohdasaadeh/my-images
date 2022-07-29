import { Body, Controller, Get, Post, Session } from '@nestjs/common';

import { CreateUserDto } from './dtos/create-user.dto';
import { GetUserDto } from './dtos/get-user.dto';
import { UserBodyProps } from './user.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';

@Controller('/api/users')
@Serialize(UserDto)
export class UserController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(body);

    session.userId = user.id;

    return user;
  }

  @Post('/signin')
  async getUser(@Body() body: GetUserDto, @Session() session: any) {
    const user = await this.authService.signin(body);

    session.userId = user.id;

    return user;
  }

  @Post('/signout')
  signoutUser(@Session() session: any) {
    session.userId = null;
  }

  @Get('/current-user')
  getCurrentUser(@CurrentUser() user: UserBodyProps) {
    if (!user) {
      return 'out';
    }

    return user;
  }
}
