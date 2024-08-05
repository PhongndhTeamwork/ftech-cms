import { SeederOptions } from "typeorm-extension";
import { DataSourceOptions } from "typeorm";
import { config } from "dotenv";
import * as process from "node:process";
import { UserEntity } from "@model/user/entities/user.entity";
import { WhitelistEntity } from "@model/whitelist/entities/whitelist.entity";
import WhitelistSeeder from "@database/seeders/whitelist.seeder";
import { WhitelistFactory } from "@database/factories/whitelist.factory";


config();


export const dataSourceOptions: DataSourceOptions = {
  type: "postgres",
  host: process.env.SQL_HOST,
  port: Number(process.env.SQL_PORT),
  database: process.env.SQL_DATABASE,
  username: process.env.SQL_USERNAME,
  password: process.env.SQL_PASSWORD,
  entities: [UserEntity, WhitelistEntity],
  ssl: {
    rejectUnauthorized: process.env.SQL_REJECT_UNAUTHORIZED === "true"
  },
  synchronize: true
};

export const seederOptions: SeederOptions = {
  seeds: [WhitelistSeeder],
  factories: [WhitelistFactory]
};
