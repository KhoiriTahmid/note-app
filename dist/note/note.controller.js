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
exports.NoteController = void 0;
const common_1 = require("@nestjs/common");
const note_service_1 = require("./note.service");
const GetUser_1 = require("../common/GetUser");
const authn_guard_1 = require("../common/authn.guard");
const authz_guard_1 = require("../common/authz.guard");
const logger_interseceptor_1 = require("../common/logger.interseceptor");
const note_schema_1 = require("./note.schema");
const validation_service_1 = require("../common/validation.service");
const Role_1 = require("../common/Role");
let NoteController = class NoteController {
    constructor(noteService) {
        this.noteService = noteService;
    }
    async getNoteWeekly(plus, mines, accountId) {
        return this.noteService.getWeeklyNoteByDate(accountId, plus, mines);
    }
    async getNoteByDate(date, accountId) {
        return this.noteService.getNoteByDate(date, accountId);
    }
    async createNote(reqBody, accountId) {
        return this.noteService.createNote(accountId, reqBody);
    }
    async updateNote(reqBody, date, accountId) {
        return this.noteService.updateNote(date, accountId, reqBody);
    }
};
exports.NoteController = NoteController;
__decorate([
    (0, common_1.Get)("/week"),
    __param(0, (0, common_1.Query)('plus', new common_1.DefaultValuePipe(0), new common_1.ParseIntPipe())),
    __param(1, (0, common_1.Query)('mines', new common_1.DefaultValuePipe(0), new common_1.ParseIntPipe())),
    __param(2, (0, GetUser_1.GetUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], NoteController.prototype, "getNoteWeekly", null);
__decorate([
    (0, common_1.Get)(":date"),
    __param(0, (0, common_1.Param)('date')),
    __param(1, (0, GetUser_1.GetUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], NoteController.prototype, "getNoteByDate", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)(new validation_service_1.ValidationService(note_schema_1.CreateNoteSchema))),
    __param(1, (0, GetUser_1.GetUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], NoteController.prototype, "createNote", null);
__decorate([
    (0, common_1.Post)("/update/:date"),
    __param(0, (0, common_1.Body)(new validation_service_1.ValidationService(note_schema_1.UpdateNoteSchema))),
    __param(1, (0, common_1.Param)('date')),
    __param(2, (0, GetUser_1.GetUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], NoteController.prototype, "updateNote", null);
exports.NoteController = NoteController = __decorate([
    (0, Role_1.Roles)("admin", "user"),
    (0, common_1.UseGuards)(authn_guard_1.AuthnGuard, authz_guard_1.AuthzGuard),
    (0, common_1.UseInterceptors)(logger_interseceptor_1.LoggerInterceptor),
    (0, common_1.Controller)('/api/note'),
    __param(0, (0, common_1.Inject)()),
    __metadata("design:paramtypes", [note_service_1.NoteService])
], NoteController);
//# sourceMappingURL=note.controller.js.map