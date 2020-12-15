/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { injectable, inject } from 'tsyringe';

import locale from '@config/locales';
import AppError from '@shared/errors/AppError';

import Role from '@modules/permissions/infra/typeorm/entities/Role';
import Permission from '@modules/permissions/infra/typeorm/entities/Permission';
import IRolesRepository from '@modules/permissions/repositories/IRolesRepository';
import IPermissionsRepository from '@modules/permissions/repositories/IPermissionsRepository';

interface IRequest {
  id: string;
  permissions: string[];
}

@injectable()
class SaveRolePermissionsService {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
    @inject('PermissionsRepository')
    private permissionsRepository: IPermissionsRepository,
  ) {}

  public async execute({ id, permissions }: IRequest): Promise<Role> {
    const role = await this.rolesRepository.findById(id);

    if (!role) {
      throw new AppError(locale.resources.roles.notFound, 404);
    }

    const permissionsList: Permission[] = [];

    for (const permission of permissions) {
      try {
        const findPermission = await this.permissionsRepository.findById(
          permission,
        );

        if (!findPermission) {
          throw new AppError(locale.resources.permissions.notFound, 404);
        }

        permissionsList.push(findPermission);
      } catch {
        throw new AppError(locale.resources.permissions.notFound, 404);
      }
    }

    return this.rolesRepository.savePermissions(role, permissionsList);
  }
}

export default SaveRolePermissionsService;
