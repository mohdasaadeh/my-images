import { Injectable, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './user.entity';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

export interface UserBodyProps {
  id?: number;
  email?: string;
  username?: string;
  password?: string;
  image?: string;
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    private cloudinary: CloudinaryService,
  ) {}

  async uploadImageToCloudinary(file: Express.Multer.File) {
    return await this.cloudinary.uploadImage(file).catch(() => {
      throw new BadRequestException('Invalid file type.');
    });
  }

  insert(body: UserBodyProps): Promise<User> {
    const user = this.repo.create(body);

    return this.repo.save(user);
  }

  findOneBy(attrs: UserBodyProps): Promise<User> {
    return this.repo.findOneBy(attrs);
  }

  async update(id: number, userData: UserBodyProps) {
    const user = await this.repo.findOne({
      where: { id, active: true },
    });

    if (!user)
      throw new BadRequestException(
        'Error in fetching the data, please try again.',
      );

    userData['editedAt'] = Date.now();

    Object.assign(user, userData);

    return this.repo.save(user);
  }
}
