import { Injectable, LogLevel } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class KeycloakConfigurationService {
  constructor(private readonly configService: ConfigService) {}

  get keycloakAuth(): string {
    return this.configService.get<string>('keycloak.keycloakAuth');
  }

  get keycloakRealm(): string {
    return this.configService.get<string>('keycloak.realm');
  }

  get keycloakClientId(): string {
    return this.configService.get<string>('keycloak.clientId');
  }

  get keycloakSecret(): string {
    return this.configService.get<string>('keycloak.secret');
  }

  get keycloakLogLevel(): LogLevel[] {
    const logLevelString = this.configService.get<string>('keycloak.logLevel', 'verbose'); // Default to 'info'
    return logLevelString.split(',') as LogLevel[]; // Convert string to LogLevel array
  }

  get keycloakNestLogger(): string {
    return this.configService.get<string>('keycloak.nestLogger');
  }

  get keycloakPolicyEnv(): string {
    return this.configService.get<string>('keycloak.policyEnv');
  }

  get keycloakTokenValidation(): 'none' | 'online' | 'offline' {
    return this.configService.get<'none' | 'online' | 'offline'>('keycloak.tokenValidation', 'online'); // Default to 'online'
  }
}