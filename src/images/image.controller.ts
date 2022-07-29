import {
  Body,
  Controller,
  Delete,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Param,
  Query,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { FileInterceptor } from '@nestjs/platform-express';

import { ImageService } from './image.service';
import { CreateImageDto } from './dtos/create-image.dto';
import { EditImageDto } from './dtos/edit-image.dto';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { AuthGuard } from '../guards/auth.guard';
import { Serialize } from '../interceptors/serialize.interceptor';
import { ImageDto } from './dtos/image.dto';
import { Image } from './image.entity';
import { ImageLike } from './image-likes/image-like.entity';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const cloudinary = require('cloudinary').v2;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const storage = new CloudinaryStorage({
  cloudinary: cloudinary.config({
    cloud_name: 'dvvk2zgur',
    api_key: '228619663234511',
    api_secret: 'xIvjfnu-2ZqVhhwkyRiIjjWi8TI',
  }),
  params: {
    folder: 'my-images',
    allowedFormats: ['jpeg', 'png', 'jpg'],
  },
});

@Controller('/api/images')
@UseGuards(AuthGuard)
export class ImageController {
  constructor(private imageService: ImageService) {}

  @Get('')
  async fetchImagesPaginated(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('term') term: string,
    @CurrentUser() user: User,
  ): Promise<Pagination<Image>> {
    limit = limit > 100 ? 100 : limit;

    return this.imageService.findAllPaginated(
      {
        page,
        limit,
        route: '/api/images',
      },
      term,
      user,
    );
  }

  @Get('/recently-liked')
  async fetchRecentlyLikedImages(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @CurrentUser() user: User,
  ): Promise<Pagination<ImageLike>> {
    limit = limit > 100 ? 100 : limit;

    return this.imageService.findAllLiked(
      {
        page,
        limit,
        route: '/api/images/recently-liked',
      },
      user,
    );
  }

  @Post('/new')
  @UseInterceptors(FileInterceptor('image', { storage }))
  @Serialize(ImageDto)
  createImage(
    @Body() body: CreateImageDto,
    @UploadedFile() image: Express.Multer.File,
    @CurrentUser() user: User,
  ) {
    return this.imageService.insert(body, user);
  }

  @Put('/:id/edit')
  @Serialize(ImageDto)
  editImage(
    @Param('id') id: string,
    @Body() body: EditImageDto,
    @CurrentUser() user: User,
  ) {
    return this.imageService.update(parseInt(id), body, user);
  }

  @Delete('/:id/edit')
  @Serialize(ImageDto)
  deleteImage(@Param('id') id: string, @CurrentUser() user: User) {
    return this.imageService.delete(parseInt(id), user);
  }
}
