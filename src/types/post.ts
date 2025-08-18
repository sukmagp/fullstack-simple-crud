export interface Post {
  id: number;
  title: string;
  content: string;
  userId?: number;
}

export type NewPost = Omit<Post, "id">;
