import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { User } from '../../users/user.entity';
import { Image } from '../image.entity';

@Entity()
export class ImageLike {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: Date.now() })
  createdAt: number;

  @ManyToOne(() => Image, (image) => image.imageLikes)
  image: Image;

  @ManyToOne(() => User, (user) => user.imageLikes)
  user: User;
}
