import { CanActivate, ExecutionContext } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
export declare class AuthnGuard implements CanActivate {
    private configService;
    private jwtService;
    constructor(configService: ConfigService, jwtService: JwtService);
    canActivate(context: ExecutionContext): boolean;
}
