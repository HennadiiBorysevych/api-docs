import { OpenAPIRegistry, OpenApiGeneratorV31 } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';
import { UserSchema, CreateUserSchema } from '../schemas/user.schema';

export const registry = new OpenAPIRegistry();

const IdParam = z.object({ id: z.string().uuid().openapi({ example: '550e8400-e29b-41d4-a716-446655440000' }) });

registry.register('User', UserSchema);
registry.register('CreateUser', CreateUserSchema);

registry.registerPath({
  method: 'get',
  path: '/users',
  summary: 'List all users',
  tags: ['Users'],
  responses: {
    200: {
      description: 'Array of users',
      content: { 'application/json': { schema: z.array(UserSchema) } },
    },
  },
});

registry.registerPath({
  method: 'post',
  path: '/users',
  summary: 'Create a user',
  tags: ['Users'],
  request: {
    body: { content: { 'application/json': { schema: CreateUserSchema } }, required: true },
  },
  responses: {
    201: {
      description: 'Created user',
      content: { 'application/json': { schema: UserSchema } },
    },
    400: { description: 'Validation error' },
  },
});

registry.registerPath({
  method: 'get',
  path: '/users/{id}',
  summary: 'Get a user by ID',
  tags: ['Users'],
  request: { params: IdParam },
  responses: {
    200: {
      description: 'The user',
      content: { 'application/json': { schema: UserSchema } },
    },
    404: { description: 'User not found' },
  },
});

registry.registerPath({
  method: 'delete',
  path: '/users/{id}',
  summary: 'Delete a user',
  tags: ['Users'],
  request: { params: IdParam },
  responses: {
    204: { description: 'Deleted successfully' },
    404: { description: 'User not found' },
  },
});

export function generateSpec() {
  return new OpenApiGeneratorV31(registry.definitions).generateDocument({
    openapi: '3.1.0',
    info: {
      title: 'Test API',
      version: '1.0.0',
      description: 'Track 1 — Zod + zod-to-openapi proof of concept',
    },
    servers: [{ url: 'http://localhost:3000' }],
  });
}
