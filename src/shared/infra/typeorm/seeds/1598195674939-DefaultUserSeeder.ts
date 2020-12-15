/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { MigrationInterface, QueryRunner } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '@modules/users/infra/typeorm/entities/User';

interface IUser {
  name: string;
  email: string;
  password: string;
}

export default class DefaultUserSeeder1598195674939
  implements MigrationInterface {
  usersData: IUser[] = [
    {
      name: 'Admin',
      email: 'admin@admin.com',
      password: '12345',
    },
  ];

  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const user of this.usersData) {
      const hashedPassword = await hash(user.password, 8);

      await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
          name: user.name,
          email: user.email,
          password: hashedPassword,
        })
        .execute();
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    for (const user of this.usersData) {
      await queryRunner.manager
        .createQueryBuilder()
        .delete()
        .from(User)
        .where('email = :email', { email: user.email })
        .execute();
    }
  }
}
