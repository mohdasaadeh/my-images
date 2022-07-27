import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  url: string;

  @Column({ default: Date.now() })
  createdAt: Date;

  @Column({ default: Date.now() })
  editedAt: Date;

  @Column({ default: true })
  active: boolean;

  @ManyToOne(() => User, (user) => user.images)
  user: User;
}
