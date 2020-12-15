import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import locale from '@config/locales';
import AppError from '@shared/errors/AppError';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import RefreshTokenService from '@modules/users/services/RefreshTokenService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticateUser.execute({ email, password });

    return response.json({ user: classToClass(user), token });
  }

  public async refresh(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new AppError(
        locale.middlewares.ensureAuthenticated.JWTtokenMissing,
        401,
      );
    }

    const [, token] = authHeader.split(' ');

    const refreshToken = container.resolve(RefreshTokenService);

    const newToken = await refreshToken.execute(token);

    return response.json({ token: newToken.token });
  }
}
