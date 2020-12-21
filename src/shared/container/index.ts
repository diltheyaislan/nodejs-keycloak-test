import { container } from 'tsyringe';

import '@modules/users/providers';
import '@shared/container/providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import IPermissionsRepository from '@modules/permissions/repositories/IPermissionsRepository';
import PermissionsRepository from '@modules/permissions/infra/typeorm/repositories/PermissionsRepository';

import IRolesRepository from '@modules/permissions/repositories/IRolesRepository';
import RolesRepository from '@modules/permissions/infra/typeorm/repositories/RolesRepository';

import IUserPermissionsRepository from '@modules/users/repositories/IUserPermissionsRepository';
import UserPermissionsRepository from '@modules/users/infra/typeorm/repositories/UserPermissionsRepository';

import IUserPermissionRepository from '@modules/permissions/repositories/IUserPermissionRepository';
import UserPermissionRepository from '@modules/permissions/infra/typeorm/repositories/UserPermissionRepository';

import IPostsRepository from '@modules/posts/repositories/IPostsRepository';
import PostsRepository from '@modules/posts/infra/typeorm/repositories/PostsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<IPermissionsRepository>(
  'PermissionsRepository',
  PermissionsRepository,
);

container.registerSingleton<IRolesRepository>(
  'RolesRepository',
  RolesRepository,
);

container.registerSingleton<IUserPermissionsRepository>(
  'UserPermissionsRepository',
  UserPermissionsRepository,
);

container.registerSingleton<IUserPermissionRepository>(
  'UserPermissionRepository',
  UserPermissionRepository,
);

container.registerSingleton<IPostsRepository>(
  'PostsRepository',
  PostsRepository,
);
