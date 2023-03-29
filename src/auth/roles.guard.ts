import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    console.log("Inside role based modules")
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    console.log(roles)
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
console.log("user>>>>>>>>>>", user)
    return roles.includes(user?.role) 
  }
}


// function matchRoles(roles: string[], roles: any): boolean {
//   throw new Error('Function not implemented.');
// }

