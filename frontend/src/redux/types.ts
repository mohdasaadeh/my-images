export type Image = {
  id: number;
  title: string;
  description: string;
  url: string;
  createdAt: Date;
  editedAt: Date;
  active: boolean;
  userId?: number;
  user?: { id: number };
};
