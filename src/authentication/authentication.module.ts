import { Module } from "@nestjs/common";
import { AuthenticationService } from "./authentication.service";
import { AuthenticationController } from "./authentication.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GoogleStrategy } from "@authentication/strategies/google.strategy";
import { PassportModule } from "@nestjs/passport";
import { UserEntity } from "@model/user/entities/user.entity";
import { UserService } from "@model/user/user.service";
import { WhitelistService } from "@model/whitelist/whitelist.service";
import { WhitelistEntity } from "@model/whitelist/entities/whitelist.entity";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, WhitelistEntity]),
    PassportModule
      .register(
        { session: false }
      ),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, GoogleStrategy, UserService, WhitelistService]
})
export class AuthenticationModule {
}
