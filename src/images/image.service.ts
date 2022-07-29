import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

import { Image } from './image.entity';
import { User } from '../users/user.entity';
import { ImageLike } from './image-likes/image-like.entity';

export interface ImageProps {
  title?: string;
  description?: string;
  url?: string;
}

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image) private repo: Repository<Image>,
    @InjectRepository(ImageLike) private imageLikeRepo: Repository<ImageLike>,
  ) {}

  async findAllPaginated(
    options: IPaginationOptions,
    term: string,
  ): Promise<Pagination<Image>> {
    const queryBuilder = this.repo.createQueryBuilder('image');

    queryBuilder
      .leftJoinAndSelect('image.user', 'user')
      .select(['image', 'user.id'])
      .getMany();

    if (term) {
      queryBuilder
        .where('image.title like :title', { title: `%${term}%` })
        .orWhere('image.description like :description', {
          description: `%${term}%`,
        });
    }

    return paginate<Image>(queryBuilder, options);
  }

  async findAllLiked(
    options: IPaginationOptions,
    user: User,
  ): Promise<Pagination<ImageLike>> {
    const queryBuilder = this.imageLikeRepo.createQueryBuilder('image_like');

    queryBuilder
      .leftJoinAndSelect('image_like.image', 'image')
      .leftJoinAndSelect('image_like.user', 'user')
      .where('image_like.user = :user', { user })
      .select(['image', 'user.id'])
      .getMany();

    return paginate<ImageLike>(queryBuilder, options);
  }

  insert(imageData: ImageProps, user: User) {
    const image = this.repo.create(imageData);

    image.user = user;

    return this.repo.save(image);
  }

  async update(id: number, imageData: ImageProps, user: User) {
    const image = await this.repo.findOne({
      where: { id, active: true, user },
      relations: { user: true },
    });

    if (!image)
      throw new BadRequestException(
        'Error in fetching the data, please try again.',
      );

    imageData['editedAt'] = Date.now();

    Object.assign(image, imageData);

    return this.repo.save(image);
  }

  async delete(id: number, user: User) {
    const image = await this.repo.findOne({
      where: { id, active: true, user },
      relations: { user: true },
    });

    if (!image)
      throw new BadRequestException(
        'Error in fetching the data, please try again.',
      );

    image.active = false;

    return this.repo.save(image);
  }
}
