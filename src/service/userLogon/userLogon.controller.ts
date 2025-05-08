import { RefreshJwtGuard } from './../../config/jwt/jwt-refresh/jwt-refresh.guard';
import { Body, Controller, Get, InternalServerErrorException, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "src/libs/config/auth/auth.service";
import { JwtAuthGuard } from "src/libs/config/auth/jwt-auth.guard";
import { LocalAuthGuard } from "src/libs/config/auth/local-auth.guard";
import { RegisterDto } from "src/models/userLogon/dto/register-user.dto";

@Controller('auth')
export class UserLogonController {
  constructor(private readonly authService: AuthService) {}
  
  @Post('register')
  async register(@Body() newUser: RegisterDto){
    return this.authService.register(newUser);
  }
  
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('logout')
  async logout(@Request() req) {
   return req.logout();
  }


  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  refreshLogin(@Request() req){
    if(!req.user){
        throw new InternalServerErrorException();
    }
    const user = req.user;
    console.log("userObj:{}", user);
    return this.authService.refreshTokens(user.sub, user.refreshToken)
  }
}