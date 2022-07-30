import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { Image } from './image.entity';
import { ImageLikeController } from './image-likes/image-like.controller';
import { ImageLikeService } from './image-likes/image-like.service';
import { ImageLike } from './image-likes/image-like.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Module({
  imports: [TypeOrmModule.forFeature([Image, ImageLike])],
  controllers: [ImageController, ImageLikeController],
  providers: [ImageService, ImageLikeService, CloudinaryService],
})
export class ImageModule {}
