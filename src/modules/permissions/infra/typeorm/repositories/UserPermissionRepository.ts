import { getRepository, Repository } from 'typeorm';

import Permission from '@modules/permissions/infra/typeorm/entities/Permission';
import IUserPermissionRepository from '@modules/permissions/repositories/IUserPermissionRepository';
import IUserHasPermissionDTO from '@modules/permissions/dtos/IUserHasPermissionDTO';

class UserPermissionRepository implements IUserPermissionRepository {
  private ormRepository: Repository<Permission>;

  constructor() {
    this.ormRepository = getRepository(Permission);
  }

  async hasPermission({
    userId,
    permissionLabel,
  }: IUserHasPermissionDTO): Promise<boolean> {
    const permission = await this.ormRepository
      .createQueryBuilder('p')
      .distinct(true)
      .innerJoin('roles_permissions', 'rp', 'rp.permission_id = p.id')
      .innerJoin('roles', 'r', 'r.id = rp.role_id')
      .innerJoin('users_roles', 'ur', 'ur.role_id = r.id')
      .where('ur.user_id = :userId AND p.label = :permissionLabel', {
        userId,
        permissionLabel,
      })
      .getOne();

    return !!permission;
  }
}

export default UserPermissionRepository;
