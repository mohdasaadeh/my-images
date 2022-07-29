export type Image = {
  id: number;
  title: string;
  description: string;
  url: string;
  createdAt: Date;
  editedAt: Date;
  active: boolean;
  user: {
    id: number;
    username: string;
    image: string;
  };
  likes: {
    imageLikesCount: number;
    likedByCurrentUser: boolean;
  };
};

export type User = {
  id: string | number;
  username: string;
};
