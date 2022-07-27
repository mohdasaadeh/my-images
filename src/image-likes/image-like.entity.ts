import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';
import { Image } from '../images/image.entity';

@Entity()
export class ImageLike {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Image, (image) => image.imageLikes)
  image: Image;

  @ManyToOne(() => User, (user) => user.imageLikes)
  user: User;
}
