import IUserHasPermissionDTO from '../dtos/IUserHasPermissionDTO';

export default interface IUserPermissionsRepository {
  hasPermission(data: IUserHasPermissionDTO): Promise<boolean>;
}
