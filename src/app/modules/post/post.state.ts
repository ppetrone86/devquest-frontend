import { PostModel } from '@models/post.model';

export interface PostState {
  posts: PostModel[];
  total: number;
}
