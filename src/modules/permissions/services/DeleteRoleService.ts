import { injectable, inject } from 'tsyringe';

import locale from '@config/locales';
import AppError from '@shared/errors/AppError';
import IRolesRepository from '@modules/permissions/repositories/IRolesRepository';

@injectable()
class DeleteRoleService {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const role = await this.rolesRepository.findById(id);

    if (!role) {
      throw new AppError(locale.resources.roles.notFound, 404);
    }

    await this.rolesRepository.delete(role.id);
  }
}

export default DeleteRoleService;
