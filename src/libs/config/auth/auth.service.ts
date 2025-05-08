import { ConflictException, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from 'src/models/user/user.service';
import { RegisterDto } from 'src/models/userLogon/dto/register-user.dto';
import { hash, verify } from 'argon2';
import { AuthConfigurationService } from './config.services';

@Injectable()
export class AuthService{
    constructor(
        private readonly jwtService : JwtService,
        private readonly userService : UserService,
        private readonly configservice : AuthConfigurationService
    ){}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userService.findOneByUsername(username);
        const isPasswordValid = await verify(user.password, pass);
        if (!isPasswordValid) {
            return null;
        }
        return user;
      }

      async login(data: any) {
        if(!data){
            throw new UnauthorizedException('Access Denied');
        }
        const user = await this.userService.findOneByUsername(data.username);
        if(user){
            const tokens = await this.getTokens(user.user_id, user.username);
            const refreshToken = user.refresh_token;
            if(refreshToken){
                tokens.refreshToken = user.refresh_token;
                return tokens;
            }else{
                await this.userService.updateRefreshToken(user.user_id, tokens.refreshToken);
                return tokens;
            }
        }
    }
    
    async refreshTokens(userId: string, refreshToken: string) {
      const user = await this.userService.findByUserId(userId);
      if (!user?.refresh_token) {
        throw new ForbiddenException('Access Denied');
      }
      const isMatch = refreshToken === user.refresh_token;
  
      if (!isMatch) {
        throw new ForbiddenException('Invalid refresh token');
      }
      const tokens = await this.getTokens(user.user_id, user.username);
      await this.userService.updateRefreshToken(user.user_id, tokens.refreshToken);
      return tokens;
    }
    
    async getTokens(userId: string, username: string) {
        const [accessToken, refreshToken] = await Promise.all([
          this.getUserToken(userId, username),
          this.getRefreshToken(userId, username),
        ]);
        return {
          accessToken,
          refreshToken,
        };
      }

    async register(newUser: RegisterDto){
        const existingUser = await this.userService.findOneByUsername(newUser.username);
        if (existingUser) {
          throw new ConflictException(`User with username ${newUser.username} already exists`);
        }
        const user = await this.userService.register({
            username: newUser.username,
            password: await hash(newUser.password),
            email: newUser.email, 
            name: newUser.name, 
        });
        const tokens = await this.getTokens(user.user_id, user.username);
        await this.userService.updateRefreshToken(user.user_id, tokens.refreshToken);
        return tokens;
      }

    getUserToken(userId: string , username:string){
        return this.jwtService.signAsync(
             {sub: userId, username},
             {
               //secret: this.configService.get<string>('JWT_SECRET'),
               expiresIn: this.configservice.getAuthUserTokenExp(),
             },
           )
     }
    
    getRefreshToken(userId: string , username:string){
       return this.jwtService.signAsync(
            {sub: userId, username},
            {
              //secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
              expiresIn: this.configservice.getAuthRefreshTokenExp(),
            },
          )
    }
    validateToken(token: string){
        return this.jwtService.verify(token);
    }
}