import { Module } from '@nestjs/common';
import { UserModule } from './models/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './libs/config/database/database.module';
import { AuthModule } from './libs/config/auth/auth.module';
import { UserLogon } from './models/userLogon/userLogon.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './libs/exception/exception-filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    UserModule,
    UserLogon,
    AuthModule,
  ],
   providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter
    }
   ],
})
export class AppModule {}
