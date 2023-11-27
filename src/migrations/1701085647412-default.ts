import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1701085647412 implements MigrationInterface {
    name = 'Default1701085647412'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Cars" ("id" SERIAL NOT NULL, "licenseplate" text NOT NULL, "color" text NOT NULL, "brand" text NOT NULL, "model" text NOT NULL, "year" integer NOT NULL, "deleted" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_4ea46e41acad7f448adbca713cf" UNIQUE ("licenseplate"), CONSTRAINT "PK_37ee9dbe8c8c8ff70b35afaf2a8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Drivers" ("id" SERIAL NOT NULL, "name" text NOT NULL, "cnh" text NOT NULL, "deleted" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_2fab94b8897510985ad60b24461" UNIQUE ("cnh"), CONSTRAINT "PK_4f4c4a5af0792f02e2028a85693" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "CarUtilization" ("id" SERIAL NOT NULL, "initialdate" TIMESTAMP, "enddate" TIMESTAMP, "reasonForUse" text NOT NULL, "driverId" integer NOT NULL, "carId" integer NOT NULL, CONSTRAINT "PK_07a12a0bfab252cfa7fd5ded062" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "CarUtilization" ADD CONSTRAINT "FK_09ecad61d2f807662da9b1f4d7a" FOREIGN KEY ("driverId") REFERENCES "Drivers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "CarUtilization" ADD CONSTRAINT "FK_3b93c195dd91a5047c8c094bcc7" FOREIGN KEY ("carId") REFERENCES "Cars"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "CarUtilization" DROP CONSTRAINT "FK_3b93c195dd91a5047c8c094bcc7"`);
        await queryRunner.query(`ALTER TABLE "CarUtilization" DROP CONSTRAINT "FK_09ecad61d2f807662da9b1f4d7a"`);
        await queryRunner.query(`DROP TABLE "CarUtilization"`);
        await queryRunner.query(`DROP TABLE "Drivers"`);
        await queryRunner.query(`DROP TABLE "Cars"`);
    }

}
