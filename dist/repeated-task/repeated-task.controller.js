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
exports.RepeatedTaskController = void 0;
const common_1 = require("@nestjs/common");
const repeated_task_service_1 = require("./repeated-task.service");
const validation_service_1 = require("../common/validation.service");
const repeatedTask_schema_1 = require("./repeatedTask.schema");
const GetUser_1 = require("../common/GetUser");
const authn_guard_1 = require("../common/authn.guard");
const authz_guard_1 = require("../common/authz.guard");
const logger_interseceptor_1 = require("../common/logger.interseceptor");
let RepeatedTaskController = class RepeatedTaskController {
    constructor(repeatedTaskService) {
        this.repeatedTaskService = repeatedTaskService;
    }
    async createRepeatedTask(reqBody, accountId) {
        return await this.repeatedTaskService.createRepeatedTask(accountId, reqBody);
    }
    async getWeeklyRepeatedTask(accountId, plus, mines) {
        return await this.repeatedTaskService.getWeeklyRepeatedTask(accountId, plus, mines);
    }
    async getRepeatedTask(accountId, date) {
        return await this.repeatedTaskService.getRepeatedTaskByDate(accountId, date);
    }
    async updateRepeatedTask(id, reqBody) {
        return await this.repeatedTaskService.updateRepeatedTask(id, reqBody);
    }
    async updateStatusRepeatedTask(accountId, reqBody) {
        return await this.repeatedTaskService.updateRepeatedTaskStatus(accountId, reqBody);
    }
};
exports.RepeatedTaskController = RepeatedTaskController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)(new validation_service_1.ValidationService(repeatedTask_schema_1.createRepeatedTaskSchema))),
    __param(1, (0, GetUser_1.GetUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], RepeatedTaskController.prototype, "createRepeatedTask", null);
__decorate([
    (0, common_1.Get)('/week'),
    __param(0, (0, GetUser_1.GetUser)('id')),
    __param(1, (0, common_1.Query)('plus', new common_1.DefaultValuePipe(0), new common_1.ParseIntPipe())),
    __param(2, (0, common_1.Query)('mines', new common_1.DefaultValuePipe(0), new common_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], RepeatedTaskController.prototype, "getWeeklyRepeatedTask", null);
__decorate([
    (0, common_1.Get)('/:date'),
    __param(0, (0, GetUser_1.GetUser)('id')),
    __param(1, (0, common_1.Param)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], RepeatedTaskController.prototype, "getRepeatedTask", null);
__decorate([
    (0, common_1.Post)('update/task/:id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __param(1, (0, common_1.Body)(new validation_service_1.ValidationService(repeatedTask_schema_1.updateRepeatedTaskById))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RepeatedTaskController.prototype, "updateRepeatedTask", null);
__decorate([
    (0, common_1.Post)('update/status'),
    __param(0, (0, GetUser_1.GetUser)('id')),
    __param(1, (0, common_1.Body)(new validation_service_1.ValidationService(repeatedTask_schema_1.updateStatusOrRemoveRepeatedTask))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RepeatedTaskController.prototype, "updateStatusRepeatedTask", null);
exports.RepeatedTaskController = RepeatedTaskController = __decorate([
    (0, common_1.Controller)('api/repeated-task'),
    (0, common_1.UseGuards)(authn_guard_1.AuthnGuard, authz_guard_1.AuthzGuard),
    (0, common_1.UseInterceptors)(logger_interseceptor_1.LoggerInterceptor),
    __param(0, (0, common_1.Inject)()),
    __metadata("design:paramtypes", [repeated_task_service_1.RepeatedTaskService])
], RepeatedTaskController);
//# sourceMappingURL=repeated-task.controller.js.map