import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { resolve } from "path";
import { Post } from "src/entities/post.entity";
import { Role } from "src/entities/role.entity";
import { User } from "src/entities/user.entity";

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
                entities: [User, Role, Post],
                migrations: [resolve(__dirname, '../dataSoucre/migration/*{.ts,.js}')],
                logging: false,
                synchronize: true,
            }),
        }),
    ],
})
export class DatabaseModule { }