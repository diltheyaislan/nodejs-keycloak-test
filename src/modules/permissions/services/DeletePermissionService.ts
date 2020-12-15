import { injectable, inject } from 'tsyringe';

import locale from '@config/locales';
import AppError from '@shared/errors/AppError';
import IPermissionsRepository from '@modules/permissions/repositories/IPermissionsRepository';

@injectable()
class DeletePermissionService {
  constructor(
    @inject('PermissionsRepository')
    private permissionsRepository: IPermissionsRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const permission = await this.permissionsRepository.findById(id);

    if (!permission) {
      throw new AppError(locale.resources.permissions.notFound, 404);
    }

    await this.permissionsRepository.delete(permission.id);
  }
}

export default DeletePermissionService;
