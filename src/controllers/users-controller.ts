import { Request, Response } from 'express';
import { randomUUID } from 'crypto';
import { CreateUserSchema, type User } from '../schemas/user.schema';

const users: User[] = [];

export function listUsers(_req: Request, res: Response) {
  res.json(users);
}

export function getUser(req: Request, res: Response) {
  const user = users.find(u => u.id === req.params.id);
  if (!user) {
    res.status(404).json({ error: 'User not found' });
    return;
  }
  res.json(user);
}

export function createUser(req: Request, res: Response) {
  const result = CreateUserSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ error: result.error.format() });
    return;
  }
  const user: User = {
    id: randomUUID(),
    name: result.data.name,
    email: result.data.email,
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  res.status(201).json(user);
}

export function deleteUser(req: Request, res: Response) {
  const index = users.findIndex(u => u.id === req.params.id);
  if (index === -1) {
    res.status(404).json({ error: 'User not found' });
    return;
  }
  users.splice(index, 1);
  res.status(204).send();
}
