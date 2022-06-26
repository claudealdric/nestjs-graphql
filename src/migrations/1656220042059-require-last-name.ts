import { MigrationInterface, QueryRunner } from 'typeorm';

export class requireLastName1656220042059 implements MigrationInterface {
  name = 'requireLastName1656220042059';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "lastName" SET NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "lastName" DROP NOT NULL`,
    );
  }
}
