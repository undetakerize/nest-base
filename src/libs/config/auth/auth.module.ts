import { Module } from "@nestjs/common";
import { UserLogon } from "src/models/userLogon/userLogon.module";
import { AuthService } from "./auth.service";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./local.strategy";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constant";
import { JwtStrategy } from "src/config/jwt/config.services";
import { UserLogonController } from "src/service/userLogon/userLogon.controller";
import { UserModule } from "src/models/user/user.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import configuration from "./configuration";
import { AuthConfigurationService } from "./config.services";
import { RefreshJwtStrategy } from "src/config/jwt/jwt-refresh/config.services";

@Module({
    imports: [
      ConfigModule.forRoot({
        load: [configuration]
      }),
      UserLogon,
      UserModule,
      PassportModule,
      JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '3600s' },
      }),
    ],
    controllers: [UserLogonController],
    providers: [AuthService, LocalStrategy, JwtStrategy, RefreshJwtStrategy, ConfigService, AuthConfigurationService],
    exports: [AuthService, ConfigService , AuthConfigurationService],
  })
  export class AuthModule {}
