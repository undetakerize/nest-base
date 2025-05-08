import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthConfigurationService{
    constructor(private readonly configService: ConfigService){}
    
    getAuthUserTokenExp(): string{
        return this.configService.get<string>('auth.authUserTokenExp');
    }
    getAuthRefreshTokenExp(): string{
        return this.configService.get<string>('auth.authRefreshTokenExp')
    }
    getAuthTokenSecret(): string{
        return this.configService.get<string>('auth.authTokenSecret');
    }
}