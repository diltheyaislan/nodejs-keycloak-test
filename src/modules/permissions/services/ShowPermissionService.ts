import { injectable, inject } from 'tsyringe';

import locale from '@config/locales';
import AppError from '@shared/errors/AppError';

import Permission from '@modules/permissions/infra/typeorm/entities/Permission';
import IPermissionsRepository from '@modules/permissions/repositories/IPermissionsRepository';

@injectable()
class ShowPermissionService {
  constructor(
    @inject('PermissionsRepository')
    private permissionsRepository: IPermissionsRepository,
  ) {}

  public async execute(id: string): Promise<Permission> {
    const permission = await this.permissionsRepository.findById(id);

    if (!permission) {
      throw new AppError(locale.resources.permissions.notFound, 404);
    }

    return permission;
  }
}

export default ShowPermissionService;
