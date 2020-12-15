import { injectable, inject } from 'tsyringe';

import locale from '@config/locales';
import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

interface IRequest {
  id: string;
  name?: string;
  email?: string;
  password?: string;
  active?: boolean;
}

@injectable()
class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    id,
    name,
    email,
    password,
    active,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError(locale.resources.users.userNotFound, 404);
    }

    if (name) {
      user.name = name;
    }

    if (email) {
      const checkUserExists = await this.usersRepository.findByEmail(email);

      if (checkUserExists && checkUserExists.id !== id) {
        throw new AppError(locale.validation.emailAlreadyUsed, 409);
      }

      user.email = email;
    }

    if (password) {
      user.password = await this.hashProvider.generateHash(password);
    }

    if (active !== undefined) {
      user.active = active;
    }

    return this.usersRepository.save(user);
  }
}

export default UpdateUserService;
