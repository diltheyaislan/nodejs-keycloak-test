import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateRoleService from '@modules/permissions/services/CreateRoleService';
import ListRoleService from '@modules/permissions/services/ListRolesServices';
import ShowRoleService from '@modules/permissions/services/ShowRoleService';
import UpdateRoleService from '@modules/permissions/services/UpdateRoleService';
import DeleteRoleService from '@modules/permissions/services/DeleteRoleService';
import SaveRolePermissionsService from '@modules/permissions/services/SaveRolePermissionsService';
import SaveRoleUsersService from '@modules/permissions/services/SaveRoleUsersService';

export default class RolesController {
  public async index(_request: Request, response: Response): Promise<Response> {
    const listRoles = container.resolve(ListRoleService);

    const roles = await listRoles.execute();

    return response.json(classToClass(roles));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showRole = container.resolve(ShowRoleService);

    const role = await showRole.execute(id);

    return response.json(classToClass(role));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { label, name } = request.body;

    const createRole = container.resolve(CreateRoleService);

    const role = await createRole.execute({
      label,
      name,
    });

    return response.json(classToClass(role));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const { name } = request.body;

    const udpateRole = container.resolve(UpdateRoleService);

    const role = await udpateRole.execute({
      id,
      name,
    });

    return response.json(classToClass(role));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteRole = container.resolve(DeleteRoleService);

    await deleteRole.execute(id);

    return response.status(204).send();
  }

  public async savePermissions(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const { permissions } = request.body;

    const saveRolePermissions = container.resolve(SaveRolePermissionsService);

    const role = await saveRolePermissions.execute({
      id,
      permissions,
    });

    return response.json(classToClass(role));
  }

  public async saveUsers(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const { users } = request.body;

    const saveRoleUsers = container.resolve(SaveRoleUsersService);

    const role = await saveRoleUsers.execute({
      id,
      users,
    });

    return response.json(classToClass(role));
  }
}
