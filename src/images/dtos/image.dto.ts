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
  @Transform(({ obj }) => {
    const { id, username, image } = obj.user;

    return { id, username, image };
  })
  user: {
    id: number;
    username: string;
    image: string;
  };

  @Expose()
  @Transform(() => {
    return {
      imageLikesCount: 0,
      likedByCurrentUser: false,
    };
  })
  likes: {
    imageLikesCount: number;
    likedByCurrentUser: boolean;
  };
}
