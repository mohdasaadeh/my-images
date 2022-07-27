import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Image } from './image.entity';
import { User } from '../users/user.entity';

export interface ImageProps {
  title?: string;
  description?: string;
  url?: string;
}

@Injectable()
export class ImageService {
  constructor(@InjectRepository(Image) private repo: Repository<Image>) {}

  findAll() {
    return this.repo.find({ relations: { user: true } });
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