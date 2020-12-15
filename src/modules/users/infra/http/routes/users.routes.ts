import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import hasPermission from '@modules/permissions/infra/http/middlewares/hasPermission';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import UsersController from '@modules/users/infra/http/controllers/UsersController';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.use(ensureAuthenticated);
usersRouter.use(hasPermission('users.all'));

usersRouter.get('/', usersController.index);

usersRouter.get('/:id', usersController.show);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);

usersRouter.patch(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
      email: Joi.string().email(),
      password: Joi.string(),
      active: Joi.boolean(),
    },
  }),
  usersController.update,
);

usersRouter.delete('/:id', usersController.delete);

export default usersRouter;
