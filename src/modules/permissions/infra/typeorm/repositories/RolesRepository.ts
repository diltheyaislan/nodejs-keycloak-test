import { getRepository, Repository } from 'typeorm';

import IRolesRepository from '@modules/permissions/repositories/IRolesRepository';
import ICreateRoleDTO from '@modules/permissions/dtos/ICreateRoleDTO';

import Role from '@modules/permissions/infra/typeorm/entities/Role';
import Permission from '@modules/permissions/infra/typeorm/entities/Permission';
import User from '@modules/users/infra/typeorm/entities/User';

class RolesRepository implements IRolesRepository {
  private ormRepository: Repository<Role>;

  constructor() {
    this.ormRepository = getRepository(Role);
  }

  public async find(): Promise<Role[]> {
    const roles = await this.ormRepository
      .createQueryBuilder('roles')
      .orderBy('name', 'ASC')
      .getMany();

    return roles;
  }

  public async findById(id: string): Promise<Role | undefined> {
    const role = await this.ormRepository.findOne(id);
    return role;
  }

  public async findByLabel(label: string): Promise<Role | undefined> {
    const role = await this.ormRepository.findOne({ where: { label } });
    return role;
  }

  public async create(roleData: ICreateRoleDTO): Promise<Role> {
    const role = this.ormRepository.create(roleData);
    await this.ormRepository.save(role);

    return role;
  }

  public async save(role: Role): Promise<Role> {
    return this.ormRepository.save(role);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  async savePermissions(role: Role, permissions: Permission[]): Promise<Role> {
    role.permissions = permissions;
    const roleWithPermissions = await this.ormRepository.save(role);
    return roleWithPermissions;
  }

  async saveUsers(role: Role, users: User[]): Promise<Role> {
    role.users = users;
    const roleWithUsers = await this.ormRepository.save(role);
    return roleWithUsers;
  }
}

export default RolesRepository;
