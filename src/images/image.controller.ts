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
} from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';

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
  ): Promise<Pagination<Image>> {
    limit = limit > 100 ? 100 : limit;

    return this.imageService.findAllPaginated({
      page,
      limit,
      route: '/api/images',
    });
  }

  @Post('/new')
  @Serialize(ImageDto)
  createImage(@Body() body: CreateImageDto, @CurrentUser() user: User) {
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
