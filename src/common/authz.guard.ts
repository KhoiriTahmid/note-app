import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import {Request} from "express";
import { Reflector } from "@nestjs/core";

@Injectable()
export class AuthzGuard implements CanActivate{
    constructor(private reflector: Reflector ){}
    canActivate(context: ExecutionContext): boolean {
        const req = context.switchToHttp().getRequest<Request>();
        const roles = this.reflector.get<string[]>('Roles',context.getHandler())

        if(!roles) return true;
        
        if (!(req['user']?.role && roles.some(e=>e===req['user'].role) )) {
            throw new UnauthorizedException()
        }
        return true
    }
}