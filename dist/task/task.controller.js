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
exports.TaskController = void 0;
const common_1 = require("@nestjs/common");
const task_service_1 = require("./task.service");
const logger_interseceptor_1 = require("../common/logger.interseceptor");
const authn_guard_1 = require("../common/authn.guard");
const authz_guard_1 = require("../common/authz.guard");
const task_schema_1 = require("./task.schema");
const validation_service_1 = require("../common/validation.service");
const GetUser_1 = require("../common/GetUser");
let TaskController = class TaskController {
    constructor(taskService) {
        this.taskService = taskService;
    }
    async createTask(reqBody, accountId) {
        return await this.taskService.createTask(accountId, reqBody);
    }
    async updateTask(reqBody, accountId, taskId) {
        return await this.taskService.updateTask(accountId, taskId, reqBody);
    }
    async getWeeklyTasksByDate(accountId, plus, mines) {
        return await this.taskService.getWeeklyTasksByDate(accountId, plus, mines);
    }
    async getOneTask(date, accountId) {
        return await this.taskService.getTasksByDate(accountId, date);
    }
};
exports.TaskController = TaskController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)(new validation_service_1.ValidationService(task_schema_1.CreateTaskSchema))),
    __param(1, (0, GetUser_1.GetUser)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "createTask", null);
__decorate([
    (0, common_1.Post)("/update/:taskId"),
    __param(0, (0, common_1.Body)(new validation_service_1.ValidationService(task_schema_1.UpdateTaskSchema))),
    __param(1, (0, GetUser_1.GetUser)("id")),
    __param(2, (0, common_1.Param)('taskId', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "updateTask", null);
__decorate([
    (0, common_1.Get)("/week"),
    __param(0, (0, GetUser_1.GetUser)("id")),
    __param(1, (0, common_1.Query)("plus", new common_1.DefaultValuePipe(0), new common_1.ParseIntPipe())),
    __param(2, (0, common_1.Query)("mines", new common_1.DefaultValuePipe(0), new common_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "getWeeklyTasksByDate", null);
__decorate([
    (0, common_1.Get)("/:date"),
    __param(0, (0, common_1.Param)("date")),
    __param(1, (0, GetUser_1.GetUser)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "getOneTask", null);
exports.TaskController = TaskController = __decorate([
    (0, common_1.UseGuards)(authn_guard_1.AuthnGuard, authz_guard_1.AuthzGuard),
    (0, common_1.UseInterceptors)(logger_interseceptor_1.LoggerInterceptor),
    (0, common_1.Controller)('/api/task'),
    __param(0, (0, common_1.Inject)()),
    __metadata("design:paramtypes", [task_service_1.TaskService])
], TaskController);
//# sourceMappingURL=task.controller.js.map