import { injectable, inject } from 'tsyringe';

import locale from '@config/locales';
import AppError from '@shared/errors/AppError';
import Role from '@modules/permissions/infra/typeorm/entities/Role';
import IRolesRepository from '@modules/permissions/repositories/IRolesRepository';

interface IRequest {
  label: string;
  name: string;
}

@injectable()
class CreateRoleService {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
  ) {}

  public async execute({ label, name }: IRequest): Promise<Role> {
    const checkRoleExists = await this.rolesRepository.findByLabel(label);

    if (checkRoleExists) {
      throw new AppError(locale.validation.alreadyExists, 409);
    }

    const role = await this.rolesRepository.create({
      label,
      name,
    });

    return role;
  }
}

export default CreateRoleService;
