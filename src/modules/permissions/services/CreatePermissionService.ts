import { injectable, inject } from 'tsyringe';

import locale from '@config/locales';
import AppError from '@shared/errors/AppError';
import Permission from '@modules/permissions/infra/typeorm/entities/Permission';
import IPermissionsRepository from '@modules/permissions/repositories/IPermissionsRepository';

interface IRequest {
  label: string;
  name: string;
}

@injectable()
class CreatePermissionService {
  constructor(
    @inject('PermissionsRepository')
    private permissionsRepository: IPermissionsRepository,
  ) {}

  public async execute({ label, name }: IRequest): Promise<Permission> {
    const checkPermissionExists = await this.permissionsRepository.findByLabel(
      label,
    );

    if (checkPermissionExists) {
      throw new AppError(locale.validation.alreadyExists, 409);
    }

    const permission = await this.permissionsRepository.create({
      label,
      name,
    });

    return permission;
  }
}

export default CreatePermissionService;
