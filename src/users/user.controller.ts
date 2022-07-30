import {
  Body,
  Controller,
  Get,
  Post,
  Session,
  Patch,
  Param,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { CreateUserDto } from './dtos/create-user.dto';
import { GetUserDto } from './dtos/get-user.dto';
import { UserBodyProps, UserService } from './user.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { EditUserDto } from './dtos/edit-user.dto';

@Controller('/api/users')
@Serialize(UserDto)
export class UserController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

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
      return { id: 'out' };
    }

    return user;
  }

  @Patch('/:id/edit')
  @UseInterceptors(FileInterceptor('image'))
  async editImage(
    @UploadedFile() image: Express.Multer.File,
    @Param('id') id: string,
    @Body() body: EditUserDto,
  ) {
    if (image) {
      const uploadedImage = await this.userService.uploadImageToCloudinary(
        image,
      );

      body['image'] = uploadedImage.url;
    }

    return this.userService.update(parseInt(id), body);
  }
}
