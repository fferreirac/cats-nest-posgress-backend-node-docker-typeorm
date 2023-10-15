import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';
//import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {

  //constructor para reflector que nos permite leer el rol
  constructor(private readonly reflector: Reflector) {
    
  }


  canActivate(
    context: ExecutionContext,
  ): boolean {

    const role = this.reflector.getAllAndOverride<Role>(ROLES_KEY,      [
        context.getHandler(),
        context.getClass()
      ]);
      //console.log(roles);
      if (!role) {
        return true;
      }

      const {user} = context.switchToHttp().getRequest();
    
      console.log(user);
      console.log(role)
      console.log(role === user.role);

      if (user.role === Role.ADMIN){
        return true;
      }

      return role === user.role;
  }
}


