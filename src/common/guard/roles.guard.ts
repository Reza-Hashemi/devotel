import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from './role.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) { }
  canActivate(context: ExecutionContext): boolean {
    const access = this.reflector.get(Roles, context.getHandler());
    if (!access) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    if (request.role != access) return false;
    return true;
  }
}
