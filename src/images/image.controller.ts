import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { ImageService } from './image.service';
import { CreateImageDto } from './dtos/create-image.dto';
import { EditImageDto } from './dtos/edit-image.dto';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { AuthGuard } from '../guards/auth.guard';
import { Serialize } from '../interceptors/serialize.interceptor';
import { ImageDto } from './dtos/image.dto';

@Controller('/api/images')
@UseGuards(AuthGuard)
@Serialize(ImageDto)
export class ImageController {
  constructor(private imageService: ImageService) {}

  @Get('/')
  fetchImages() {
    return this.imageService.findAll();
  }

  @Post('/new')
  createImage(@Body() body: CreateImageDto, @CurrentUser() user: User) {
    return this.imageService.insert(body, user);
  }

  @Put('/:id/edit')
  editImage(
    @Param('id') id: string,
    @Body() body: EditImageDto,
    @CurrentUser() user: User,
  ) {
    return this.imageService.update(parseInt(id), body, user);
  }

  @Delete('/:id/edit')
  deleteImage(@Param('id') id: string, @CurrentUser() user: User) {
    return this.imageService.delete(parseInt(id), user);
  }
}
