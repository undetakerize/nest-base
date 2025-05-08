import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import configuration from "./configuration";
import { DatabasePostgresConfigService } from "./config.services";

@Module({
    imports:[
        ConfigModule.forRoot({
            load: [configuration]
        }),
    ],
    providers: [ConfigService, DatabasePostgresConfigService],
    exports: [ConfigService, DatabasePostgresConfigService],    
})
export class DatabasePostgresConfigModule{}