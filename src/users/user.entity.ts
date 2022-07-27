import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { Image } from '../images/image.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  image: string;

  @Column({ default: Date.now() })
  createdAt: Date;

  @Column({ default: Date.now() })
  editedAt: Date;

  @Column({ default: true })
  active: boolean;

  @OneToMany(() => Image, (image) => image.user)
  images: Image[];
}
