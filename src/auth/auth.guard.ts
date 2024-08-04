import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException
  } from '@nestjs/common';
  import { jwtConstants } from './constants';
  import { JwtService } from '@nestjs/jwt';
  import { Request } from 'express';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest<Request>();
      const token = this.extractTokenFromHeader(request);
      console.log("token", token);
  
      if (!token) {
        throw new UnauthorizedException();
      }
  
      try {
        const payload = await this.jwtService.verifyAsync(token, {
          secret: jwtConstants.secret,
        });
        console.log("payload", payload);
        // Ajoutez ici votre logique supplémentaire si nécessaire
        return true; // Authentification réussie
      } catch {
        throw new UnauthorizedException(); // Échec de la vérification du token
      }
    }
  
    private extractTokenFromHeader(request: Request): string | null {
      const authHeader = request.headers.authorization;
      if (!authHeader) {
        return null;
      }
      const [type, token] = authHeader.split(' ');
      return type === 'Bearer' ? token : null;
    }
  }
  