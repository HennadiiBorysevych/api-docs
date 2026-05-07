import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

extendZodWithOpenApi(z);

export const PostSchema = z.object({
  id: z.string().uuid().openapi({ example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' }),
  userId: z.string().uuid().openapi({ example: '550e8400-e29b-41d4-a716-446655440000' }),
  title: z.string().openapi({ example: 'My first post' }),
  body: z.string().openapi({ example: 'Hello world!' }),
  createdAt: z.string().datetime().openapi({ example: '2026-05-07T10:00:00Z' }),
}).openapi('Post');

export type Post = z.infer<typeof PostSchema>;
