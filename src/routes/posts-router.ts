import { Router } from 'express';
import { getUserPosts } from '../controllers/posts-controller';

export const postsRouter = Router({ mergeParams: true });

postsRouter.get('/', getUserPosts);
