"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const common_module_1 = require("./common/common.module");
const account_module_1 = require("./account/account.module");
const note_module_1 = require("./note/note.module");
const repeated_task_module_1 = require("./repeated-task/repeated-task.module");
const task_module_1 = require("./task/task.module");
const endless_task_module_1 = require("./endless_task/endless_task.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [common_module_1.CommonModule, account_module_1.AccountModule, note_module_1.NoteModule, repeated_task_module_1.RepeatedTaskModule, task_module_1.TaskModule, endless_task_module_1.EndlessTaskModule],
        controllers: [],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map