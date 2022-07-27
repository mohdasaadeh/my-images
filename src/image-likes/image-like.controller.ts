import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';

import { ImageLikeService } from './image-like.service';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { AuthGuard } from '../guards/auth.guard';
import { Serialize } from '../interceptors/serialize.interceptor';
import { ImageLikeDto } from './dtos/image-like.dto';

@Controller('/api/image-likes')
@UseGuards(AuthGuard)
@Serialize(ImageLikeDto)
export class ImageLikeController {
  constructor(private imageLikeService: ImageLikeService) {}

  @Get('/:imageId')
  fetchImageLikes(
    @Param('imageId') imageId: string,
    @CurrentUser() user: User,
  ) {
    return this.imageLikeService.findAll(parseInt(imageId), user);
  }

  @Post('/:imageId/new')
  createImageLike(
    @Param('imageId') imageId: string,
    @CurrentUser() user: User,
  ) {
    return this.imageLikeService.insert(parseInt(imageId), user);
  }

  @Delete('/:imageId/delete')
  deleteImageLike(
    @Param('imageId') imageId: string,
    @CurrentUser() user: User,
  ) {
    return this.imageLikeService.delete(parseInt(imageId), user);
  }
}
