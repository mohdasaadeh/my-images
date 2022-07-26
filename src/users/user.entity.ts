import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { Image } from '../images/image.entity';
import { ImageLike } from '../images/image-likes/image-like.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({
    nullable: true,
  })
  image: string;

  @Column({ default: Date.now() })
  createdAt: Date;

  @Column({ default: Date.now() })
  editedAt: Date;

  @Column({ default: true })
  active: boolean;

  @OneToMany(() => Image, (image) => image.user)
  images: Image[];

  @OneToMany(() => ImageLike, (imageLike) => imageLike.user)
  imageLikes: ImageLike[];
}
