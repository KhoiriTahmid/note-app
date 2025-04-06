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
exports.EndlessTaskController = void 0;
const common_1 = require("@nestjs/common");
const GetUser_1 = require("../common/GetUser");
const endless_task_service_1 = require("./endless_task.service");
const endless_task_schema_1 = require("./endless_task.schema");
const validation_service_1 = require("../common/validation.service");
const authn_guard_1 = require("../common/authn.guard");
const authz_guard_1 = require("../common/authz.guard");
const logger_interseceptor_1 = require("../common/logger.interseceptor");
let EndlessTaskController = class EndlessTaskController {
    constructor(endlessTaskService) {
        this.endlessTaskService = endlessTaskService;
    }
    async addEndlessTask(accountId, reqBody) {
        console.info(reqBody);
        return this.endlessTaskService.createEndlessTask(accountId, reqBody);
    }
    async getWeeklyEndlessTask(accountId, plus, mines) {
        return await this.endlessTaskService.getWeeklyEndlessTasks(accountId, plus, mines);
    }
    async getEndlessTask(accountId, date) {
        return await this.endlessTaskService.getEndlessTasksByDate(accountId, date);
    }
    async updateEndlessTaskById(accountId, taskId, data) {
        return await this.endlessTaskService.updateEndlessTask(accountId, taskId, data);
    }
    async updateEndlessTaskCompleted(accountId, data) {
        return await this.endlessTaskService.updateComplitedDates(accountId, data);
    }
};
exports.EndlessTaskController = EndlessTaskController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, GetUser_1.GetUser)('id')),
    __param(1, (0, common_1.Body)(new validation_service_1.ValidationService(endless_task_schema_1.CreateEndlessTaskSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], EndlessTaskController.prototype, "addEndlessTask", null);
__decorate([
    (0, common_1.Get)("/week"),
    __param(0, (0, GetUser_1.GetUser)('id')),
    __param(1, (0, common_1.Query)('plus', new common_1.DefaultValuePipe(0), new common_1.ParseIntPipe())),
    __param(2, (0, common_1.Query)('mines', new common_1.DefaultValuePipe(0), new common_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], EndlessTaskController.prototype, "getWeeklyEndlessTask", null);
__decorate([
    (0, common_1.Get)("/:date"),
    __param(0, (0, GetUser_1.GetUser)('id')),
    __param(1, (0, common_1.Param)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], EndlessTaskController.prototype, "getEndlessTask", null);
__decorate([
    (0, common_1.Post)("update/:id"),
    __param(0, (0, GetUser_1.GetUser)('id')),
    __param(1, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __param(2, (0, common_1.Body)(new validation_service_1.ValidationService(endless_task_schema_1.UpdateEndlessTaskSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], EndlessTaskController.prototype, "updateEndlessTaskById", null);
__decorate([
    (0, common_1.Post)("update-status/"),
    __param(0, (0, GetUser_1.GetUser)('id')),
    __param(1, (0, common_1.Body)(new validation_service_1.ValidationService(endless_task_schema_1.UpdateComplitedDatesSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], EndlessTaskController.prototype, "updateEndlessTaskCompleted", null);
exports.EndlessTaskController = EndlessTaskController = __decorate([
    (0, common_1.UseGuards)(authn_guard_1.AuthnGuard, authz_guard_1.AuthzGuard),
    (0, common_1.UseInterceptors)(logger_interseceptor_1.LoggerInterceptor),
    (0, common_1.Controller)('api/endlessTask'),
    __param(0, (0, common_1.Inject)()),
    __metadata("design:paramtypes", [endless_task_service_1.EndlessTaskService])
], EndlessTaskController);
//# sourceMappingURL=endless_task.controller.js.map