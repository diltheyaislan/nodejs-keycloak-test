import Permission from '@modules/permissions/infra/typeorm/entities/Permission';
import ICreatePermissionDTO from '@modules/permissions/dtos/ICreatePermissionDTO';

export default interface IPermissionsRepository {
  find(): Promise<Permission[]>;
  findById(id: string): Promise<Permission | undefined>;
  findByLabel(label: string): Promise<Permission | undefined>;
  create(data: ICreatePermissionDTO): Promise<Permission>;
  save(Permission: Permission): Promise<Permission>;
  delete(id: string): Promise<void>;
}
