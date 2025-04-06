"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepeatedTaskModule = void 0;
const common_1 = require("@nestjs/common");
const repeated_task_service_1 = require("./repeated-task.service");
const repeated_task_controller_1 = require("./repeated-task.controller");
let RepeatedTaskModule = class RepeatedTaskModule {
};
exports.RepeatedTaskModule = RepeatedTaskModule;
exports.RepeatedTaskModule = RepeatedTaskModule = __decorate([
    (0, common_1.Module)({
        providers: [repeated_task_service_1.RepeatedTaskService],
        controllers: [repeated_task_controller_1.RepeatedTaskController]
    })
], RepeatedTaskModule);
//# sourceMappingURL=repeated-task.module.js.map