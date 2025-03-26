import { CanActivate, ConflictException, ExecutionContext, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import {Request} from "express";

@Injectable()
export class AuthnGuard implements CanActivate{
    constructor(private configService:ConfigService, private jwtService: JwtService){}
    canActivate(context: ExecutionContext): boolean {
        const req = context.switchToHttp().getRequest<Request>();
        const token = req.headers.authorization?.replace("Bearer ",'').trim();
        if (!token) throw new UnauthorizedException()

        const access_key = this.configService.get<string>('ACCESS_TOKEN_KEY')
        

        if (!access_key) throw new InternalServerErrorException()
        
        try {
            const verif = this.jwtService.verify(token,{secret:access_key});
            req['user']=verif;
        } catch  {
            throw new UnauthorizedException()
        }
        
        return true
        
    }
}