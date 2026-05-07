import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

extendZodWithOpenApi(z);

export const UserSchema = z.object({
  id: z.string().uuid().openapi({ example: '550e8400-e29b-41d4-a716-446655440000' }),
  name: z.string().openapi({ example: 'Jane Doe' }),
  email: z.string().email().openapi({ example: 'jane@example.com' }),
  createdAt: z.string().datetime().openapi({ example: '2026-05-07T10:00:00Z' }),
}).openapi('User');

export const CreateUserSchema = z.object({
  name: z.string().min(1).openapi({ example: 'Jane Doe' }),
  email: z.string().email().openapi({ example: 'jane@example.com' }),
}).openapi('CreateUser');

export type User = z.infer<typeof UserSchema>;
export type CreateUser = z.infer<typeof CreateUserSchema>;
