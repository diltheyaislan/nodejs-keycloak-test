/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { MigrationInterface, QueryRunner, createConnection } from 'typeorm';
import RolesRepository from '@modules/permissions/infra/typeorm/repositories/RolesRepository';
import PermissionsRepository from '@modules/permissions/infra/typeorm/repositories/PermissionsRepository';
import Permission from '@modules/permissions/infra/typeorm/entities/Permission';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

interface IData {
  name: string;
  label: string;
}

export default class PermissionsSeeder1598393877697
  implements MigrationInterface {
  rolesData: IData[] = [
    {
      name: 'Administrator',
      label: 'admin',
    },
  ];

  permissionsData: IData[] = [
    {
      name: 'All users permissions',
      label: 'users.all',
    },
    {
      name: 'All permissions permissions',
      label: 'permissions.all',
    },
    {
      name: 'All roles permissions',
      label: 'roles.all',
    },
  ];

  public async up(_queryRunner: QueryRunner): Promise<void> {
    await createConnection('default');

    for (const role of this.rolesData) {
      const rolesRepository = new RolesRepository();

      const insertedRole = await rolesRepository.create({
        name: role.name,
        label: role.label,
      });

      const permissions: Permission[] = [];

      for (const permission of this.permissionsData) {
        const permissionsRepository = new PermissionsRepository();

        const insertPermission = await permissionsRepository.create({
          name: permission.name,
          label: permission.label,
        });

        permissions.push(insertPermission);
      }

      insertedRole.permissions = permissions;

      const usersRepository = new UsersRepository();

      const admin = await usersRepository.findByEmail('admin@admin.com');

      insertedRole.users = !admin ? [] : [admin];

      await rolesRepository.save(insertedRole);
    }
  }

  public async down(_queryRunner: QueryRunner): Promise<void> {
    for (const role of this.rolesData) {
      const rolesRepository = new RolesRepository();

      const roleFound = await rolesRepository.findByLabel(role.label);

      if (roleFound) {
        await rolesRepository.delete(roleFound.id);
      }
    }

    for (const permission of this.permissionsData) {
      const permissionsRepository = new PermissionsRepository();

      const permissionFound = await permissionsRepository.findByLabel(
        permission.label,
      );

      if (permissionFound) {
        await permissionsRepository.delete(permissionFound.id);
      }
    }
  }
}
