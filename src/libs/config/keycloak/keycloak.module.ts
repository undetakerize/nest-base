import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import KeycloakConnect from "keycloak-connect";
import { KeycloakConnectModule, PolicyEnforcementMode, TokenValidation } from "nest-keycloak-connect";
import { KeycloakConfigModule } from "src/config/keycloak/config.module";
import { KeycloakConfigurationService } from "src/config/keycloak/config.services";
import { LogLevel } from "typeorm";


@Module({
    imports: [
      KeycloakConfigModule,
      KeycloakConnectModule.registerAsync({
        useFactory: async (keycloakConfigService: KeycloakConfigurationService) => ({
          authServerUrl: keycloakConfigService.keycloakAuth,
          realm: keycloakConfigService.keycloakRealm,
          clientId: keycloakConfigService.keycloakClientId,
          secret: keycloakConfigService.keycloakSecret,
          logLevels: keycloakConfigService.keycloakLogLevel,
          policyEnforcement: PolicyEnforcementMode.PERMISSIVE,
          tokenValidation: TokenValidation.ONLINE,
        }),
        inject: [KeycloakConfigurationService],
        imports: [KeycloakConfigModule],
      }),
    ],
    exports: [KeycloakConnectModule],
  })
export class KeycloakModule{}