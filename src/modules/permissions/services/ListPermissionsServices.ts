import { injectable, inject } from 'tsyringe';

import Permission from '@modules/permissions/infra/typeorm/entities/Permission';
import IPermissionsRepository from '@modules/permissions/repositories/IPermissionsRepository';

@injectable()
class ListPermissionService {
  constructor(
    @inject('PermissionsRepository')
    private permissionsRepository: IPermissionsRepository,
  ) {}

  public async execute(): Promise<Permission[]> {
    const permissions = await this.permissionsRepository.find();

    return permissions;
  }
}

export default ListPermissionService;
