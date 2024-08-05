import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.getOrThrow("SQL_HOST"),
        port: configService.getOrThrow("SQL_PORT"),
        database: configService.getOrThrow("SQL_DATABASE"),
        username: configService.getOrThrow("SQL_USERNAME"),
        password: configService.getOrThrow("SQL_PASSWORD"),
        autoLoadEntities: true,
        migrations: [
          "src/database/migrations/*.ts",
          "dist/database/migrations/*{.ts,.js}"
        ],
        migrationsTableName: "migration",
        synchronize: configService.getOrThrow("SQL_SYNC")=== "true",
        ssl: {
          rejectUnauthorized: configService.getOrThrow("SQL_REJECT_UNAUTHORIZED") === "true"
        }
      }),
      inject: [ConfigService]
    })
  ]
})
export class PostgresProvider {
}
