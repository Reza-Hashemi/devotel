import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { resolve } from "path";

@Module({
    imports: [

        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService): TypeOrmModuleOptions => ({
                type: 'postgres',
                host: config.get<string>("DATABASE_HOST"),
                port: config.get<number>("DATABASE_PORT"),
                username: config.get<string>("DATABASE_USERNAME"),
                password: config.get<string>("DATABASE_PASSWORD"),
                database: config.get<string>("DATABASE_NAME"),
                schema: config.get<string>("DATABASE_SCHEMA"),
                entities: [resolve(__dirname, '../../../entities/*.entity.ts')],
                migrations: [resolve(__dirname, '../dataSoucre/migration/*{.ts,.js}')],
                logging: false,
                synchronize: false,
            }),
        }),
    ],
})
export class DatabaseModule { }