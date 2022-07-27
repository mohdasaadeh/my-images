import { Expose, Transform } from 'class-transformer';

export class ImageDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  url: string;

  @Expose()
  createdAt: Date;

  @Expose()
  editedAt: Date;

  @Expose()
  active: boolean;

  @Expose()
  @Transform(({ obj }) => obj.user.id)
  userId: number;
}
