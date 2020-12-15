import { injectable, inject } from 'tsyringe';

import locale from '@config/locales';
import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';

@injectable()
class CheckUserActiveService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(id: string): Promise<boolean> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError(locale.resources.users.userNotFound, 404);
    }

    return user.active;
  }
}

export default CheckUserActiveService;
