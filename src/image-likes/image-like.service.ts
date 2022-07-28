import { BadRequestException, Injectable } from '@nestjs/common';
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
      throw new BadRequestException(
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
    });

    if (!image)
      throw new BadRequestException(
        'Error in fetching data, please try again.',
      );

    let imageLike = await this.imageLikeRepo.findOneBy({ image, user });

    if (imageLike)
      throw new BadRequestException('You liked this image before!');

    imageLike = this.imageLikeRepo.create();

    imageLike.image = image;
    imageLike.user = user;

    return this.imageLikeRepo.save(imageLike);
  }

  async delete(imageId: number, user: User) {
    const image = await this.imageRepo.findOneBy({
      id: imageId,
      active: true,
    });

    if (!image)
      throw new BadRequestException(
        'Error in fetching data, please try again.',
      );

    const imageLike = await this.imageLikeRepo.findOne({
      where: { image, user },
      relations: { image: true, user: true },
    });

    if (!imageLike)
      throw new BadRequestException("You didn't like this image before!");

    const deletedLike = await this.imageLikeRepo.delete(imageLike.id);

    if (deletedLike.affected !== 1) {
      throw new BadRequestException(
        'Error in fetching data, please try again.',
      );
    }

    return imageLike;
  }
}
