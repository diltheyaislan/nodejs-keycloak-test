import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import PostsController from '@modules/posts/infra/http/controllers/PostsController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import Keycloak from '@shared/infra/keycloak';

const postsRouter = Router();
const postsController = new PostsController();

// postsRouter.use(ensureAuthenticated);

postsRouter.use(Keycloak.getKeycloak().protect('user'));

postsRouter.get('/', postsController.index);

postsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      content: Joi.string().required(),
    },
  }),
  postsController.create,
);

postsRouter.patch(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      title: Joi.string(),
      content: Joi.string(),
    },
  }),
  postsController.update,
);

postsRouter.delete('/:id', postsController.delete);

export default postsRouter;
