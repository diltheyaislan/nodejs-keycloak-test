import { uuid } from 'uuidv4';

import IPermissionsRepository from '@modules/permissions/repositories/IPermissionsRepository';
import ICreatePermissionDTO from '@modules/permissions/dtos/ICreatePermissionDTO';

import Permission from '@modules/permissions/infra/typeorm/entities/Permission';

class FakePermissionsRepository implements IPermissionsRepository {
  private permissions: Permission[] = [];

  public async findById(id: string): Promise<Permission | undefined> {
    const foundPermission = this.permissions.find(
      permission => permission.id === id,
    );
    return foundPermission;
  }

  public async findByLabel(label: string): Promise<Permission | undefined> {
    const foundPermission = this.permissions.find(
      permission => permission.label === label,
    );
    return foundPermission;
  }

  public async create(
    permissionData: ICreatePermissionDTO,
  ): Promise<Permission> {
    const permission = new Permission();

    Object.assign(permission, { id: uuid() }, permissionData);

    this.permissions.push(permission);

    return permission;
  }

  public async save(permission: Permission): Promise<Permission> {
    const permissionIndex = this.permissions.findIndex(
      findPermission => findPermission.id === permission.id,
    );

    this.permissions[permissionIndex] = permission;

    return permission;
  }

  public async delete(id: string): Promise<void> {
    const permissionIndex = this.permissions.findIndex(
      findPermission => findPermission.id === id,
    );

    this.permissions.splice(permissionIndex, 1);
  }

  public async find(): Promise<Permission[]> {
    const { permissions } = this;

    return permissions;
  }
}

export default FakePermissionsRepository;
