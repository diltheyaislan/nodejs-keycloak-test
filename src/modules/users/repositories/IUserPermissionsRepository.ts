import Permission from '@modules/permissions/infra/typeorm/entities/Permission';
import Role from '@modules/permissions/infra/typeorm/entities/Role';
import User from '@modules/users/infra/typeorm/entities/User';

export default interface IUserPermissionsRepository {
  permissions(user: User): Promise<Permission[]>;
  roles(user: User): Promise<Role[]>;
}
