import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request, Response } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    console.log(`roles in roles.guards.ts: ${roles}`);
    const req = context.switchToHttp().getRequest();

    //console.log(context.switchToHttp().getRequest<Response>()['user']);
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    
    const user = request.user;
    console.log(user, roles)
    
    return roles.includes('admin');
  }
}