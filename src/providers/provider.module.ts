import { Module } from "@nestjs/common";
import { PostgresProvider } from "@provider/postgres.provider";
import { JwtProvider } from "@provider/jwt.provider";

@Module({
  imports: [PostgresProvider, JwtProvider],
  exports: [PostgresProvider, JwtProvider]
})
export class ProviderModule {
}
