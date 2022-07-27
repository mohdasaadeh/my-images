import { Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  image: string;

  @Expose()
  createdAt: Date;

  @Expose()
  editedAt: Date;

  @Expose()
  active: boolean;
}
