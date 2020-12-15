import { getRepository, Repository } from 'typeorm';

import Role from '@modules/permissions/infra/typeorm/entities/Role';
import Permission from '@modules/permissions/infra/typeorm/entities/Permission';
import User from '@modules/users/infra/typeorm/entities/User';
import IUserPermissionsRepository from '@modules/users/repositories/IUserPermissionsRepository';

class UserPermissionsRepository implements IUserPermissionsRepository {
  private ormPermissionRepository: Repository<Permission>;

  private ormRoleRepository: Repository<Role>;

  constructor() {
    this.ormPermissionRepository = getRepository(Permission);
    this.ormRoleRepository = getRepository(Role);
  }

  async permissions(user: User): Promise<Permission[]> {
    const permissions = await this.ormPermissionRepository
      .createQueryBuilder('p')
      .distinct(true)
      .innerJoin('roles_permissions', 'rp', 'rp.permission_id = p.id')
      .innerJoin('roles', 'r', 'r.id = rp.role_id')
      .innerJoin('users_roles', 'ur', 'ur.role_id = r.id')
      .where('ur.user_id = :userId', { userId: user.id })
      .getMany();

    return permissions;
  }

  async roles(user: User): Promise<Role[]> {
    const roles = await this.ormRoleRepository
      .createQueryBuilder('r')
      .innerJoin('users_roles', 'ur', 'ur.role_id = r.id')
      .where('ur.user_id = :userId', { userId: user.id })
      .getMany();

    return roles;
  }
}

export default UserPermissionsRepository;
