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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountController = void 0;
const common_1 = require("@nestjs/common");
const account_service_1 = require("./account.service");
const logger_interseceptor_1 = require("../common/logger.interseceptor");
const validation_service_1 = require("../common/validation.service");
const account_schema_1 = require("./account.schema");
const Role_1 = require("../common/Role");
const authn_guard_1 = require("../common/authn.guard");
const authz_guard_1 = require("../common/authz.guard");
const GetUser_1 = require("../common/GetUser");
let AccountController = class AccountController {
    constructor(accountService) {
        this.accountService = accountService;
    }
    async create(req) {
        return await this.accountService.signUp(req);
    }
    async login(req, res) {
        const { response, refresh_token } = await this.accountService.login(req);
        res.cookie("refresh_token", refresh_token, { httpOnly: true, secure: true, sameSite: 'lax' });
        return res.json(response);
    }
    async updateAccount(req) {
        if (!req.user.id || !req.body.id || req.user.id !== req.body.id) {
            throw new common_1.UnauthorizedException();
        }
        const arg = { id: req.body.id };
        if (req.body.username)
            arg['username'] = req.body.username;
        if (req.body.email)
            arg['email'] = req.body.email;
        return await this.accountService.updateAccount(arg);
    }
    async forgetPassword(req) {
        if (!req.user.id || !req.body.id || req.user.id !== req.body.id) {
            throw new common_1.UnauthorizedException();
        }
        return await this.accountService.forgetPassword(req.body.id, req.body.password);
    }
    async getAccountById(id) {
        return await this.accountService.getAccountById(id);
    }
    async getAllAccount() {
        return await this.accountService.getAllAccount();
    }
    async deleteAccount() {
        return await this.accountService.deleteUser();
    }
};
exports.AccountController = AccountController;
__decorate([
    (0, common_1.Post)('/signup'),
    (0, common_1.UsePipes)(new validation_service_1.ValidationService(account_schema_1.AccountSignupSchema)),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "create", null);
__decorate([
    (0, common_1.Post)("/login"),
    (0, common_1.UsePipes)(new validation_service_1.ValidationService(account_schema_1.AccountLoginSchema)),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(authn_guard_1.AuthnGuard, authz_guard_1.AuthzGuard),
    (0, Role_1.Roles)("user", "admin"),
    (0, common_1.Post)("/update"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "updateAccount", null);
__decorate([
    (0, common_1.UseGuards)(authn_guard_1.AuthnGuard, authz_guard_1.AuthzGuard),
    (0, Role_1.Roles)("user", "admin"),
    (0, common_1.UsePipes)(new validation_service_1.ValidationService(account_schema_1.AccountUpdateSchema)),
    (0, common_1.Post)("/forget"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "forgetPassword", null);
__decorate([
    (0, common_1.UseGuards)(authn_guard_1.AuthnGuard, authz_guard_1.AuthzGuard),
    (0, Role_1.Roles)("user", "admin"),
    (0, common_1.Get)(),
    __param(0, (0, GetUser_1.GetUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "getAccountById", null);
__decorate([
    (0, common_1.UseGuards)(authn_guard_1.AuthnGuard, authz_guard_1.AuthzGuard),
    (0, Role_1.Roles)("user", "admin"),
    (0, common_1.Get)("/all"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "getAllAccount", null);
__decorate([
    (0, common_1.UseGuards)(authn_guard_1.AuthnGuard, authz_guard_1.AuthzGuard),
    (0, Role_1.Roles)("user", "admin"),
    (0, common_1.Delete)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "deleteAccount", null);
exports.AccountController = AccountController = __decorate([
    (0, common_1.Controller)('api/account'),
    (0, common_1.UseInterceptors)(logger_interseceptor_1.LoggerInterceptor),
    __param(0, (0, common_1.Inject)()),
    __metadata("design:paramtypes", [account_service_1.AccountService])
], AccountController);
//# sourceMappingURL=account.controller.js.map