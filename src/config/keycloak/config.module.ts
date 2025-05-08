import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { KeycloakConfigurationService } from "./config.services";
import configuration from "./configuration";

@Module({
    imports:[
        ConfigModule.forRoot({
            load: [configuration]
        }),
    ],
    providers: [ConfigService, KeycloakConfigurationService],
    exports: [ConfigService, KeycloakConfigurationService],
})
export class KeycloakConfigModule{}