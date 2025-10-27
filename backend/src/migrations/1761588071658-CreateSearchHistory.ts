import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSearchHistory1761588071658 implements MigrationInterface {
    name = 'CreateSearchHistory1761588071658'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "search_history" ("id" SERIAL NOT NULL, "query" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cb93c8f85dbdca85943ca494812" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "search_history"`);
    }

}
