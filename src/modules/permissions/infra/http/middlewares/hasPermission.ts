/* eslint-disable func-names */
import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

import locale from '@config/locales';
import AppError from '@shared/errors/AppError';
import UserHasPermissionService from '@modules/permissions/services/UserHasPermissionService';

export default function hasPermission(permission: string) {
  return async function (
    request: Request,
    _response: Response,
    next: NextFunction,
  ): Promise<void> {
    if (!request.user.id) {
      throw new AppError(
        locale.middlewares.ensureAuthenticated.JWTtokenMissing,
        401,
      );
    }

    const userHasPermission = container.resolve(UserHasPermissionService);

    const isAuthorized = await userHasPermission.execute({
      userId: request.user.id,
      permissionLabel: permission,
    });

    if (!isAuthorized) {
      throw new AppError(locale.middlewares.hasPermission.accessDenied, 403);
    }

    return next();
  };
}
