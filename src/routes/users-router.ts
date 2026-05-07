import { Router } from 'express';
import { listUsers, getUser, createUser, deleteUser } from '../controllers/users-controller';

export const usersRouter = Router();

usersRouter.get('/', listUsers);
usersRouter.post('/', createUser);
usersRouter.get('/:id', getUser);
usersRouter.delete('/:id', deleteUser);
