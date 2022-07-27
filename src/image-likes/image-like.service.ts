import { BadGatewayException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { ImageLike } from './image-like.entity';
import { Image } from '../images/image.entity';
import { User } from '../users/user.entity';

@Injectable()
export class ImageLikeService {
  constructor(
    @InjectRepository(ImageLike) private imageLikeRepo: Repository<ImageLike>,
    @InjectRepository(Image) private imageRepo: Repository<Image>,
  ) {}

  async findAll(imageId: number, user: User) {
    const image = await this.imageRepo.findOneBy({
      id: imageId,
      active: true,
      user,
    });

    if (!image)
      throw new BadGatewayException(
        'Error in fetching data, please try again.',
      );

    return this.imageLikeRepo.find({
      where: { image },
      relations: { image: true, user: true },
    });
  }

  async insert(imageId: number, user: User) {
    const image = await this.imageRepo.findOneBy({
      id: imageId,
      active: true,
      user,
    });

    if (!image)
      throw new BadGatewayException(
        'Error in fetching data, please try again.',
      );

    const imageLike = this.imageLikeRepo.create();

    imageLike.image = image;
    imageLike.user = user;

    return this.imageLikeRepo.save(imageLike);
  }

  async delete(imageId: number, user: User) {
    const image = await this.imageRepo.findOneBy({
      id: imageId,
      active: true,
      user,
    });

    if (!image)
      throw new BadGatewayException(
        'Error in fetching data, please try again.',
      );

    const imageLike = await this.imageLikeRepo.findOne({
      where: { image, user },
      relations: { image: true, user: true },
    });

    const deletedLike = await this.imageLikeRepo.delete(imageLike.id);

    if (deletedLike.affected < 1) {
      throw new BadGatewayException(
        'Error in fetching data, please try again.',
      );
    }

    return imageLike;
  }
}
