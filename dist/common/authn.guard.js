"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthnGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
let AuthnGuard = class AuthnGuard {
    constructor(configService, jwtService) {
        this.configService = configService;
        this.jwtService = jwtService;
    }
    canActivate(context) {
        const req = context.switchToHttp().getRequest();
        const token = req.headers.authorization?.replace("Bearer ", '').trim();
        if (!token)
            throw new common_1.UnauthorizedException();
        const access_key = this.configService.get('ACCESS_TOKEN_KEY');
        if (!access_key)
            throw new common_1.InternalServerErrorException();
        try {
            const verif = this.jwtService.verify(token, { secret: access_key });
            req['user'] = verif;
        }
        catch {
            throw new common_1.UnauthorizedException();
        }
        return true;
    }
};
exports.AuthnGuard = AuthnGuard;
exports.AuthnGuard = AuthnGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService, jwt_1.JwtService])
], AuthnGuard);
//# sourceMappingURL=authn.guard.js.map