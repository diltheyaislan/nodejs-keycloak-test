/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { injectable, inject } from 'tsyringe';

import locale from '@config/locales';
import AppError from '@shared/errors/AppError';

import Role from '@modules/permissions/infra/typeorm/entities/Role';
import User from '@modules/users/infra/typeorm/entities/User';
import IRolesRepository from '@modules/permissions/repositories/IRolesRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  id: string;
  users: string[];
}

@injectable()
class SaveRoleUsersService {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ id, users }: IRequest): Promise<Role> {
    const role = await this.rolesRepository.findById(id);

    if (!role) {
      throw new AppError(locale.resources.roles.notFound, 404);
    }

    const usersList: User[] = [];

    for (const user of users) {
      try {
        const findUser = await this.usersRepository.findById(user);

        if (!findUser) {
          throw new AppError(locale.resources.users.userNotFound, 404);
        }

        usersList.push(findUser);
      } catch {
        throw new AppError(locale.resources.users.userNotFound, 404);
      }
    }

    return this.rolesRepository.saveUsers(role, usersList);
  }
}

export default SaveRoleUsersService;
