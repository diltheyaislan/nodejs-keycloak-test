import { injectable, inject } from 'tsyringe';

import Role from '@modules/permissions/infra/typeorm/entities/Role';
import IRolesRepository from '@modules/permissions/repositories/IRolesRepository';

@injectable()
class ListRoleService {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
  ) {}

  public async execute(): Promise<Role[]> {
    const roles = await this.rolesRepository.find();

    return roles;
  }
}

export default ListRoleService;
