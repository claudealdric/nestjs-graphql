import { MigrationInterface, QueryRunner } from 'typeorm';

export class renameDateFields1656196239237 implements MigrationInterface {
  name = 'renameDateFields1656196239237';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createdDate"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updatedDate"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "createDate" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "updateDate" TIMESTAMP NOT NULL DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updateDate"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createDate"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "updatedDate" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "createdDate" TIMESTAMP NOT NULL DEFAULT now()`,
    );
  }
}
