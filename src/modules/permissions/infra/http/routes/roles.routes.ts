import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import hasPermission from '@modules/permissions/infra/http/middlewares/hasPermission';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import RolesController from '@modules/permissions/infra/http/controllers/RolesController';

const rolesRouter = Router();
const rolesController = new RolesController();

rolesRouter.use(ensureAuthenticated);
rolesRouter.use(hasPermission('roles.all'));

rolesRouter.get('/', rolesController.index);

rolesRouter.get('/:id', rolesController.show);

rolesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      label: Joi.string().required(),
      name: Joi.string().required(),
    },
  }),
  rolesController.create,
);

rolesRouter.patch(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  rolesController.update,
);

rolesRouter.delete('/:id', rolesController.delete);

rolesRouter.put(
  '/:id/permissions',
  celebrate({
    [Segments.BODY]: {
      permissions: Joi.array().required(),
    },
  }),
  rolesController.savePermissions,
);

rolesRouter.put(
  '/:id/users',
  celebrate({
    [Segments.BODY]: {
      users: Joi.array().required(),
    },
  }),
  rolesController.saveUsers,
);

export default rolesRouter;
