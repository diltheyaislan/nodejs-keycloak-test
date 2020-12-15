import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';
import { verify } from 'jsonwebtoken';

import locale from '@config/locales';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import CheckUserActiveService from '@modules/users/services/CheckUserActiveService';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default async function ensureAuthenticated(
  request: Request,
  _response: Response,
  next: NextFunction,
): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError(
      locale.middlewares.ensureAuthenticated.JWTtokenMissing,
      401,
    );
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub } = decoded as ITokenPayload;
    request.user = {
      id: sub,
    };

    const checkUserActive = container.resolve(CheckUserActiveService);

    const userActive = await checkUserActive.execute(sub);

    if (!userActive) {
      throw new AppError(locale.auth.inactiveAccount, 403);
    }

    return next();
  } catch (error) {
    if (error.statusCode) {
      throw new AppError(error.message, error.statusCode);
    }

    throw new AppError(
      locale.middlewares.ensureAuthenticated.InvalidJWTToken,
      401,
    );
  }
}
