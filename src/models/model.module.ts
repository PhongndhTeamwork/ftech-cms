import { Module } from "@nestjs/common";
import { UserModule } from "@model/user/user.module";
import { WhitelistModule } from "./whitelist/whitelist.module";


@Module({
  imports: [UserModule, WhitelistModule],
  exports: [UserModule, WhitelistModule]
})
export class ModelModule {
}
