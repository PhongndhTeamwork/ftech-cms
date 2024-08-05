import { Module } from "@nestjs/common";
import { WhitelistService } from "./whitelist.service";
import { WhitelistController } from "./whitelist.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WhitelistEntity } from "@model/whitelist/entities/whitelist.entity";

@Module({
  imports: [TypeOrmModule.forFeature([WhitelistEntity])],
  controllers: [WhitelistController],
  providers: [WhitelistService],
  // exports : [WhitelistService],
})
export class WhitelistModule {}
