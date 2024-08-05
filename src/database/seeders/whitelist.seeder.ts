import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { DataSource } from "typeorm";
import { WhitelistEntity } from "@model/whitelist/entities/whitelist.entity";


export default class WhitelistSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<void> {
    const whitelistFactory = factoryManager.get(WhitelistEntity);
    await whitelistFactory.saveMany(10);
  }
}