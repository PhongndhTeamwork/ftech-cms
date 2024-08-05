import { setSeederFactory } from "typeorm-extension";
import { WhitelistEntity } from "@model/whitelist/entities/whitelist.entity";

const WhitelistFactory = setSeederFactory(WhitelistEntity, (faker) => {
  const whitelist = new WhitelistEntity();
  whitelist.email = faker.internet.email();
  return whitelist;
});

export { WhitelistFactory };