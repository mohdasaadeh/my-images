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
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

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
    private cloudinary: CloudinaryService,
  ) {}

  async uploadImageToCloudinary(file: Express.Multer.File) {
    return await this.cloudinary.uploadImage(file).catch(() => {
      throw new BadRequestException('Invalid file type.');
    });
  }

  async findAllPaginated(
    options: IPaginationOptions,
    term: string,
    user: User,
  ): Promise<Pagination<Image>> {
    const queryBuilder = this.repo.createQueryBuilder('image');

    queryBuilder
      .leftJoinAndSelect('image.user', 'user')
      .select(['image', 'user.id', 'user.username', 'user.image'])
      .getMany();

    if (term) {
      queryBuilder
        .where('image.title like :title', { title: `%${term}%` })
        .orWhere('image.description like :description', {
          description: `%${term}%`,
        });
    }

    const result = await paginate<Image>(queryBuilder, options);

    for (const item of result.items) {
      const imageLikes = await this.imageLikeRepo
        .createQueryBuilder('imageLike')
        .select('COUNT(imageLike.image)', 'imageLikesCount')
        .where('imageLike.image = :imageId', { imageId: item.id })
        .getRawOne();

      item['likes'] = imageLikes;

      const likedByCurrentUser = await this.imageLikeRepo
        .createQueryBuilder('imageLike')
        .where('imageLike.image = :imageId', { imageId: item.id })
        .andWhere('imageLike.user = :userId', { userId: user.id })
        .getOne();

      if (likedByCurrentUser) {
        item['likes']['likedByCurrentUser'] = true;
      } else {
        item['likes']['likedByCurrentUser'] = false;
      }
    }

    return result;
  }

  async findAllLiked(
    options: IPaginationOptions,
    user: User,
  ): Promise<Pagination<Image>> {
    const queryBuilder = this.repo.createQueryBuilder('image');

    queryBuilder
      .leftJoinAndSelect('image.imageLikes', 'imageLikes')
      .leftJoinAndSelect('imageLikes.user', 'user')
      .where('imageLikes.user.id = :userId', { userId: user.id })
      .select(['image', 'user.id', 'user.username', 'user.image'])
      .getMany();

    const result = await paginate<Image>(queryBuilder, options);

    for (const item of result.items) {
      const imageLikes = await this.imageLikeRepo
        .createQueryBuilder('imageLike')
        .select('COUNT(imageLike.image)', 'imageLikesCount')
        .where('imageLike.image = :imageId', { imageId: item.id })
        .getRawOne();

      item['likes'] = imageLikes;

      const likedByCurrentUser = await this.imageLikeRepo
        .createQueryBuilder('imageLike')
        .where('imageLike.image = :imageId', { imageId: item.id })
        .andWhere('imageLike.user = :userId', { userId: user.id })
        .getOne();

      if (likedByCurrentUser) {
        item['likes']['likedByCurrentUser'] = true;
      } else {
        item['likes']['likedByCurrentUser'] = false;
      }
    }

    return result;
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
