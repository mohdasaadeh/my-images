import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './user.entity';

export interface UserBodyProps {
  id?: number;
  email?: string;
  username?: string;
  password?: string;
  image?: string;
}

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  insert(body: UserBodyProps): Promise<User> {
    const user = this.repo.create(body);

    return this.repo.save(user);
  }

  findOneBy(attrs: UserBodyProps): Promise<User> {
    return this.repo.findOneBy(attrs);
  }
}
