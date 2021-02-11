import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import UserController from '../controllers/UsersController';
import isAuthenticated from '@modules/users/middlewares/isAuthenticated.ts';

const usersRouter = Router();
const usersController = new UserController();

usersRouter.get('/', isAuthenticated, usersController.index);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);

export default usersRouter;
