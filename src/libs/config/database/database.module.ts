import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { join } from 'node:path';
import { DatabasePostgresConfigModule } from 'src/config/database/postgres/config.module';
import { DatabasePostgresConfigService } from 'src/config/database/postgres/config.services';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [DatabasePostgresConfigModule],
      useFactory: (configService: DatabasePostgresConfigService) => ({
        type: 'postgres',
        host: configService.dbHost,
        port: configService.dbPort,
        username: configService.dbUser,
        password: String(configService.dbPassword),
        database: configService.dbName,
        entities: [__dirname + ' ../../../**/*.entity.{js,ts}'],
        synchronize: configService.dbSync === 'true',
        autoLoadEntities: true,
        migrations: [join(__dirname, '..', 'migrations', '*.ts')],
        logging: configService.dbLogging, 
        migrationsRun: false,
        namingStrategy: new SnakeNamingStrategy()
      }),
      inject: [DatabasePostgresConfigService],
    } as TypeOrmModuleAsyncOptions),
  ],
})
export class DatabaseModule {}
