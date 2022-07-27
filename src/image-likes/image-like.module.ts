import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ImageLikeController } from './image-like.controller';
import { ImageLikeService } from './image-like.service';
import { ImageLike } from './image-like.entity';
import { Image } from '../images/image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ImageLike, Image])],
  controllers: [ImageLikeController],
  providers: [ImageLikeService],
})
export class ImageLikeModule {}
