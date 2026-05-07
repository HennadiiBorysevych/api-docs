import { Request, Response } from 'express';
import type { Post } from '../schemas/post.schema';
import { randomUUID } from 'crypto';

const posts: Post[] = [
  { id: randomUUID(), userId: '550e8400-e29b-41d4-a716-446655440000', title: 'Hello world', body: 'First post!', createdAt: new Date().toISOString() },
];

export function getUserPosts(req: Request, res: Response) {
  const userPosts = posts.filter(p => p.userId === req.params.id);
  res.json(userPosts);
}
