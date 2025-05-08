import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConstants } from "src/libs/config/auth/constant";

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy , 'jwt-refresh'){
    constructor() {
        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          secretOrKey: jwtConstants.secret,
          passReqToCallback: true,
        });
      }

    async validate(req: Request, payload: any) {
        const refreshToken = req.get('Authorization').replace('Bearer', '').trim();
        return { ...payload, refreshToken };
    }

}