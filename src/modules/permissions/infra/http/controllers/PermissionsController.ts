import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreatePermissionService from '@modules/permissions/services/CreatePermissionService';
import ListPermissionService from '@modules/permissions/services/ListPermissionsServices';
import ShowPermissionService from '@modules/permissions/services/ShowPermissionService';
import UpdatePermissionService from '@modules/permissions/services/UpdatePermissionService';
import DeletePermissionService from '@modules/permissions/services/DeletePermissionService';

export default class PermissionsController {
  public async index(_request: Request, response: Response): Promise<Response> {
    const listPermissions = container.resolve(ListPermissionService);

    const permissions = await listPermissions.execute();

    return response.json(classToClass(permissions));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showPermission = container.resolve(ShowPermissionService);

    const permission = await showPermission.execute(id);

    return response.json(classToClass(permission));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { label, name } = request.body;

    const createPermission = container.resolve(CreatePermissionService);

    const permission = await createPermission.execute({
      label,
      name,
    });

    return response.json(classToClass(permission));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const { name } = request.body;

    const udpatePermission = container.resolve(UpdatePermissionService);

    const permission = await udpatePermission.execute({
      id,
      name,
    });

    return response.json(classToClass(permission));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deletePermission = container.resolve(DeletePermissionService);

    await deletePermission.execute(id);

    return response.status(204).send();
  }
}
