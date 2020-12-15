import { uuid } from 'uuidv4';

import IRolesRepository from '@modules/permissions/repositories/IRolesRepository';
import ICreateRoleDTO from '@modules/permissions/dtos/ICreateRoleDTO';

import Role from '@modules/permissions/infra/typeorm/entities/Role';
import Permission from '@modules/permissions/infra/typeorm/entities/Permission';
import User from '@modules/users/infra/typeorm/entities/User';

class FakeRolesRepository implements IRolesRepository {
  private roles: Role[] = [];

  public async findById(id: string): Promise<Role | undefined> {
    const foundRole = this.roles.find(role => role.id === id);
    return foundRole;
  }

  public async findByLabel(label: string): Promise<Role | undefined> {
    const foundRole = this.roles.find(role => role.label === label);
    return foundRole;
  }

  public async create(roleData: ICreateRoleDTO): Promise<Role> {
    const role = new Role();

    Object.assign(role, { id: uuid() }, roleData);

    this.roles.push(role);

    return role;
  }

  public async save(role: Role): Promise<Role> {
    const roleIndex = this.roles.findIndex(findRole => findRole.id === role.id);

    this.roles[roleIndex] = role;

    return role;
  }

  public async delete(id: string): Promise<void> {
    const roleIndex = this.roles.findIndex(findRole => findRole.id === id);

    this.roles.splice(roleIndex, 1);
  }

  public async find(): Promise<Role[]> {
    const { roles } = this;

    return roles;
  }

  async savePermissions(role: Role, _permissions: Permission[]): Promise<Role> {
    return role;
  }

  async savePUsers(role: Role, _users: User[]): Promise<Role> {
    return role;
  }
}

export default FakeRolesRepository;
