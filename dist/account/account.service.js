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
exports.AccountService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma.service");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const model_1 = require("../modelAndSchema/model");
const customException_1 = require("../common/customException");
let AccountService = class AccountService {
    constructor(prismaService, configService, jwtService) {
        this.prismaService = prismaService;
        this.configService = configService;
        this.jwtService = jwtService;
    }
    async signUp({ username, email, password, role }) {
        const res = await this.prismaService.account.findMany({ where: { OR: [{ username }, { email }] } });
        if (res.length == 0) {
            password = bcrypt.hashSync(password, 10);
            const { password: _, ...result } = await this.prismaService.account.create({ data: { username, email, password, role } });
            return (0, model_1.successResponseMaker)("success create account.", result);
        }
        let errors = [];
        if (res.some(account => account.email === email)) {
            errors.push({ field: "email", desc: "already exist" });
        }
        if (res.some(account => account.username === username)) {
            errors.push({ field: "username", desc: "already exist" });
        }
        throw new customException_1.CustomException(400, "conflict with existing data.", errors);
    }
    async getAccountById(id) {
        const result = await this.prismaService.account.findUnique({ where: { id } });
        if (!result) {
            throw new common_1.NotFoundException("Account not found");
        }
        const { password: _, ...res } = result;
        return (0, model_1.successResponseMaker)("Account ditemukan", res);
    }
    async updateAccount({ id, email, username }) {
        if (!email && !username) {
            throw new common_1.HttpException("there is no email and username you passed", 400);
        }
        let data = {};
        if (email)
            data.email = email;
        if (username)
            data.username = username;
        console.info(data);
        const { password, ...result } = await this.prismaService.account.update({ where: { id }, data });
        return (0, model_1.successResponseMaker)("account succesfully updated", result);
    }
    async forgetPassword(id, password) {
        const hashedPassword = bcrypt.hashSync(password, 10);
        const { password: _, ...result } = await this.prismaService.account.update({ where: { id }, data: { password } });
        return (0, model_1.successResponseMaker)("success update password", result);
    }
    async getAllAccount() {
        return await this.prismaService.account.findMany();
    }
    async deleteUser(key = "koko") {
        return await this.prismaService.account.deleteMany({ where: { username: key } });
    }
    async login({ usernameOrEmail, password }) {
        const res = await this.prismaService.account.findFirst({ where: { OR: [{ username: usernameOrEmail }, { email: usernameOrEmail }] } });
        if (!res) {
            throw new common_1.NotFoundException("username or email not found");
        }
        if (!bcrypt.compareSync(password, res.password)) {
            throw new common_1.HttpException('password wrong', 400);
        }
        const access_key = this.configService.get('ACCESS_TOKEN_KEY');
        const refresh_key = this.configService.get('REFRESH_TOKEN_KEY');
        if (!access_key || !refresh_key) {
            throw new common_1.InternalServerErrorException();
        }
        const access_token = this.jwtService.sign({ id: res.id, username: res.username, role: res.role, tokenType: "access" }, { secret: access_key, expiresIn: '60m' });
        const refresh_token = this.jwtService.sign({ id: res.id, tokenType: "refresh" }, { secret: refresh_key, expiresIn: '7d' });
        return { refresh_token, response: (0, model_1.successResponseMaker)("login success.", { access_token }) };
    }
};
exports.AccountService = AccountService;
exports.AccountService = AccountService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService,
        jwt_1.JwtService])
], AccountService);
//# sourceMappingURL=account.service.js.map