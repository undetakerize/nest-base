import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class DatabasePostgresConfigService {
  constructor(private readonly configService: ConfigService) {}

  get dbName(): string {
    return this.configService.get<string>('databasePostgres.dbName');
  }
  get dbHost(): string {
    return this.configService.get<string>('databasePostgres.dbHost');
  }
  get dbUser(): string {
    return this.configService.get<string>('databasePostgres.dbUser');
  }
  get dbPassword(): string {
    return this.configService.get<string>('databasePostgres.dbPassword');
  }
  get dbPort(): number {
    return this.configService.get<number>('databasePostgres.dbPort');
  }
  get dbSync(): string {
    return this.configService.get<string>('databasePostgres.dbSync');
  }
  get dbLogging(): boolean {
    return this.configService.get<string>('databasePostgres.dbLogging') === 'true';
  }
}