import { injectable, inject } from 'tsyringe';

import locale from '@config/locales';
import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUserPermissionsRepository from '../repositories/IUserPermissionsRepository';

interface IRequest {
  user_id: string;
}

@injectable()
class ShowProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UserPermissionsRepository')
    private userPermissionsRepository: IUserPermissionsRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError(locale.resources.users.userNotFound, 404);
    }

    const permissions = await this.userPermissionsRepository.permissions(user);

    user.permissions = permissions.map(permission => permission.label);

    const roles = await this.userPermissionsRepository.roles(user);

    user.roles = roles.map(role => role.label);

    return user;
  }
}

export default ShowProfileService;
