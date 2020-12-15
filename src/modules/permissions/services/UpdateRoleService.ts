import { injectable, inject } from 'tsyringe';

import locale from '@config/locales';
import AppError from '@shared/errors/AppError';

import Role from '@modules/permissions/infra/typeorm/entities/Role';
import IRolesRepository from '@modules/permissions/repositories/IRolesRepository';

interface IRequest {
  id: string;
  name: string;
}

@injectable()
class UpdateRoleService {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
  ) {}

  public async execute({ id, name }: IRequest): Promise<Role> {
    const role = await this.rolesRepository.findById(id);

    if (!role) {
      throw new AppError(locale.resources.roles.notFound, 404);
    }

    role.name = name;

    return this.rolesRepository.save(role);
  }
}

export default UpdateRoleService;
