import { MigrationInterface, QueryRunner } from "typeorm"

export class FirstMigration1685707163438 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.query(
    //   `ALTER TABLE "categories" ADD COLUMN "name2" VARCHAR(80)`
    // )
    //
    // await queryRunner.query(
    //   `UPDATE categories SET name2 = name`
    // )
    //
    // await queryRunner.query(
    //   `ALTER TABLE categories DROP COLUMN name`
    // )
    //
    // await queryRunner.query(
    //   `ALTER TABLE categories CHANGE name2 name VARCHAR(80)`
    // )

    await queryRunner.query(
      // To avoid data loss when changing the length of a column, you can do the following:
      // 1. Create a new column with the new length and copy the data from the old column to the new column:
      `ALTER TABLE categories ADD COLUMN name2 VARCHAR(80) DEFAULT name`
    );

    await queryRunner.query(
      // 2. Drop the old column and rename the new column to the original name:
      `ALTER TABLE categories DROP COLUMN name, CHANGE name2 name VARCHAR(80) NOT NULL UNIQUE`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE categories ADD COLUMN name2 VARCHAR(255) DEFAULT name`
    );

    await queryRunner.query(
      `ALTER TABLE categories DROP COLUMN name, CHANGE name2 name VARCHAR(255) NOT NULL UNIQUE`
    );
  }

}
