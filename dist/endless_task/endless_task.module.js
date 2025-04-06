"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EndlessTaskModule = void 0;
const common_1 = require("@nestjs/common");
const endless_task_service_1 = require("./endless_task.service");
const endless_task_controller_1 = require("./endless_task.controller");
let EndlessTaskModule = class EndlessTaskModule {
};
exports.EndlessTaskModule = EndlessTaskModule;
exports.EndlessTaskModule = EndlessTaskModule = __decorate([
    (0, common_1.Module)({
        providers: [endless_task_service_1.EndlessTaskService],
        controllers: [endless_task_controller_1.EndlessTaskController]
    })
], EndlessTaskModule);
//# sourceMappingURL=endless_task.module.js.map