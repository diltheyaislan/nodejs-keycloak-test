import { injectable, inject } from 'tsyringe';

import locale from '@config/locales';
import AppError from '@shared/errors/AppError';

import Permission from '@modules/permissions/infra/typeorm/entities/Permission';
import IPermissionsRepository from '@modules/permissions/repositories/IPermissionsRepository';

interface IRequest {
  id: string;
  name: string;
}

@injectable()
class UpdatePermissionService {
  constructor(
    @inject('PermissionsRepository')
    private permissionsRepository: IPermissionsRepository,
  ) {}

  public async execute({ id, name }: IRequest): Promise<Permission> {
    const permission = await this.permissionsRepository.findById(id);

    if (!permission) {
      throw new AppError(locale.resources.permissions.notFound, 404);
    }

    permission.name = name;

    return this.permissionsRepository.save(permission);
  }
}

export default UpdatePermissionService;
