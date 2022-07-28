import { Expose, Transform } from 'class-transformer';

export class ImageLikeDto {
  @Expose()
  id: number;

  @Expose()
  @Transform(({ obj }) => obj.image.id)
  imageId: number;

  @Expose()
  @Transform(({ obj }) => obj.user.id)
  userId: number;
}
