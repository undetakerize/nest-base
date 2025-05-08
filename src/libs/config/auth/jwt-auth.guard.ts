import { ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

export class JwtAuthGuard extends AuthGuard('jwt'){
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;
    
        if (!authHeader) {
          throw new UnauthorizedException('Missing authentication token');
        }
    
        const token = authHeader.replace(/^Bearer\s+/i, '').trim();
    
        if (!token) {
          throw new UnauthorizedException('Invalid authentication token format');
        }
    
        try {
          const isValid = (await super.canActivate(context)) as boolean;
    
          if (!isValid) {
            throw new UnauthorizedException('Invalid or expired token');
          }
    
          return true;
        } catch (error) {
          throw new UnauthorizedException(error.message || 'Session expired! Please sign in.');
        }
      }
    
      handleRequest(err, user) {
        if (err || !user) {
          throw new UnauthorizedException(err?.message || 'Unauthorized access');
        }
        return user;
      }
    
}