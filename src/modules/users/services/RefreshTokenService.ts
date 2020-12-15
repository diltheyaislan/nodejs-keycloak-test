import 'dotenv/config';

import { sign, decode } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';

import locale from '@config/locales';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

interface IResponse {
  token: string;
}

@injectable()
class RefreshTokenService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(token: string): Promise<IResponse> {
    const decodedToken = decode(token);

    const { sub } = decodedToken as ITokenPayload;

    const user = await this.usersRepository.findById(sub);

    if (!user) {
      throw new AppError(locale.resources.users.userNotFound, 404);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const newToken = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      token: newToken,
    };
  }
}

export default RefreshTokenService;
