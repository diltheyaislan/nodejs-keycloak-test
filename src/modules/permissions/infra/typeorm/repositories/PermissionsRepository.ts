import { getRepository, Repository } from 'typeorm';

import IPermissionsRepository from '@modules/permissions/repositories/IPermissionsRepository';
import ICreatePermissionDTO from '@modules/permissions/dtos/ICreatePermissionDTO';

import Permission from '@modules/permissions/infra/typeorm/entities/Permission';

class PermissionsRepository implements IPermissionsRepository {
  private ormRepository: Repository<Permission>;

  constructor() {
    this.ormRepository = getRepository(Permission);
  }

  public async find(): Promise<Permission[]> {
    const permissions = await this.ormRepository.find({
      order: { name: 'ASC' },
    });
    return permissions;
  }

  public async findById(id: string): Promise<Permission | undefined> {
    const permission = await this.ormRepository.findOne(id);
    return permission;
  }

  public async findByLabel(label: string): Promise<Permission | undefined> {
    const permission = await this.ormRepository.findOne({ where: { label } });
    return permission;
  }

  public async create(
    permissionData: ICreatePermissionDTO,
  ): Promise<Permission> {
    const permission = this.ormRepository.create(permissionData);
    await this.ormRepository.save(permission);

    return permission;
  }

  public async save(permission: Permission): Promise<Permission> {
    return this.ormRepository.save(permission);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default PermissionsRepository;
