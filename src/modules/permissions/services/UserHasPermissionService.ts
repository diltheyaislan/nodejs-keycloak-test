import { injectable, inject } from 'tsyringe';

import locale from '@config/locales';
import AppError from '@shared/errors/AppError';

import Permission from '@modules/permissions/infra/typeorm/entities/Permission';
import IUserPermissionRepository from '@modules/permissions/repositories/IUserPermissionRepository';
import IUserHasPermissionDTO from '../dtos/IUserHasPermissionDTO';

@injectable()
class UserHasPermissionService {
  constructor(
    @inject('UserPermissionRepository')
    private userPermissionRepository: IUserPermissionRepository,
  ) {}

  public async execute({
    userId,
    permissionLabel,
  }: IUserHasPermissionDTO): Promise<boolean> {
    return this.userPermissionRepository.hasPermission({
      userId,
      permissionLabel,
    });
  }
}

export default UserHasPermissionService;
