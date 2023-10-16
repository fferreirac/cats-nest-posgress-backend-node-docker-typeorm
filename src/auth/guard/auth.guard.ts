import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
//import { Observable } from 'rxjs';
import {Request} from 'express';
import { jwtConstants } from '../constants/jwt.constant';

@Injectable()
export class AuthGuard implements CanActivate {

  // hacemos la inyeccion de jwtService para poder acceder al servicio
  constructor(
    private readonly jwtService: JwtService
  ) {}


  async canActivate(context: ExecutionContext): Promise<boolean>  {

    const request = context.switchToHttp().getRequest();
    
    ///console.log(request.headers.authorization);
    // hacemos la solicitud
    const token = this.extractTokenFromHearder(request);
    if (!token) {
      throw new UnauthorizedException();
    }

    //de existir hacemos el try/cach (debe estar intectado el servicio: jwtService)
    try {
      const payload = await this.jwtService.verifyAsync(token
         /*,{secret: jwtConstants.secret}*/);
      // agregamos e request al usuario
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();      
    }
    return true;
  }

  private extractTokenFromHearder(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}


