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
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Patch,
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
  ): Promise<Pagination<Image>> {
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
  @UseInterceptors(FileInterceptor('image'))
  @Serialize(ImageDto)
  async createImage(
    @UploadedFile() image: Express.Multer.File,
    @Body() body: CreateImageDto,
    @CurrentUser() user: User,
  ) {
    const uploadedImage = await this.imageService.uploadImageToCloudinary(
      image,
    );

    body['url'] = uploadedImage.url;

    return this.imageService.insert(body, user);
  }

  @Patch('/:id/edit')
  @UseInterceptors(FileInterceptor('image'))
  @Serialize(ImageDto)
  async editImage(
    @UploadedFile() image: Express.Multer.File,
    @Param('id') id: string,
    @Body() body: EditImageDto,
    @CurrentUser() user: User,
  ) {
    if (image) {
      const uploadedImage = await this.imageService.uploadImageToCloudinary(
        image,
      );

      body['url'] = uploadedImage.url;
    }

    return this.imageService.update(parseInt(id), body, user);
  }

  @Delete('/:id/delete')
  @Serialize(ImageDto)
  deleteImage(@Param('id') id: string, @CurrentUser() user: User) {
    return this.imageService.delete(parseInt(id), user);
  }
}
