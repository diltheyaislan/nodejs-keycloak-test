import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import hasPermission from '@modules/permissions/infra/http/middlewares/hasPermission';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import PermissionsController from '@modules/permissions/infra/http/controllers/PermissionsController';

const permissionsRouter = Router();
const permissionsController = new PermissionsController();

permissionsRouter.use(ensureAuthenticated);
permissionsRouter.use(hasPermission('permissions.all'));

permissionsRouter.get('/', permissionsController.index);

permissionsRouter.get('/:id', permissionsController.show);

permissionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      label: Joi.string().required(),
      name: Joi.string().required(),
    },
  }),
  permissionsController.create,
);

permissionsRouter.patch(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  permissionsController.update,
);

permissionsRouter.delete('/:id', permissionsController.delete);

export default permissionsRouter;
