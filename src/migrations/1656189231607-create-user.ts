import { MigrationInterface, QueryRunner } from 'typeorm';

export class createUser1656189231607 implements MigrationInterface {
  name = 'createUser1656189231607';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
