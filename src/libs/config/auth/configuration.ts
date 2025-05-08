import { registerAs } from "@nestjs/config";

export default registerAs('auth', () => ({
    authUserTokenExp: process.env.AUTH_TOKEN_EXPIRED,
    authRefreshTokenExp: process.env.AUTH_REFRESH_TOKEN_EXPIRED,
    authTokenSecret: process.env.AUTH_TOKEN_SECRET,
    authRefreshTokenSecret: process.env.AUTH_REFRESH_TOKEN_SECRET,
  }));