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
exports.NoteService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma.service");
const customException_1 = require("../common/customException");
const model_1 = require("../modelAndSchema/model");
const helper_1 = require("../common/helper");
let NoteService = class NoteService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async createNote(accountId, data) {
        const findRes = await this.prismaService.note.findUnique({ where: { accountId_date: { accountId, date: data.date } } });
        if (findRes)
            throw new customException_1.CustomException(common_1.HttpStatus.FORBIDDEN, "Note in same date already exist");
        const res = await this.prismaService.note.create({ data: { ...data, accountId }, omit: { accountId: true } });
        return (0, model_1.successResponseMaker)("success created new note.", res);
    }
    async getNoteByDate(date, accountId) {
        const dateInFormat = (0, helper_1.validateAndReturnDate)(date);
        const findRes = await this.prismaService.note.findUnique({ where: { accountId_date: { accountId, date: dateInFormat } }, omit: { accountId: true } });
        if (!findRes)
            throw new customException_1.CustomException(common_1.HttpStatus.NOT_FOUND, "Note didnt exist.");
        return (0, model_1.successResponseMaker)("success find note.", findRes);
    }
    async getWeeklyNoteByDate(accountId, plus, mines) {
        const { sundayDate, saturdayDate } = (0, helper_1.getSundayAndSaturdayDate)(plus, mines);
        const findRes = await this.prismaService.note.findMany({ where: { AND: [{ accountId }, { date: { gte: sundayDate, lte: saturdayDate } }] }, omit: { accountId: true } });
        if (!findRes)
            throw new customException_1.CustomException(common_1.HttpStatus.NOT_FOUND, "Note didnt exist.");
        const map = new Map(findRes.map(e => ([e.date.getDay(), e])));
        let week = {};
        for (let index = 0; index < 7; index++) {
            week[index] = map.get(index) || null;
        }
        map.clear();
        return (0, model_1.successResponseMaker)("success find note.", week);
    }
    async updateNote(date, accountId, { label, text, files }) {
        const dateInFormat = (0, helper_1.validateAndReturnDate)(date);
        let data = {};
        if (label)
            data['label'] = label;
        if (text)
            data['text'] = text;
        if (files)
            data['files'] = { push: files };
        if (!Object.keys(data).length)
            throw new customException_1.CustomException(400, "No data passed. Please give at least one data");
        const res = await this.prismaService.note.update({ where: { accountId_date: { accountId, date: dateInFormat } }, data, omit: { accountId: true } });
        return (0, model_1.successResponseMaker)("success update note", res);
    }
};
exports.NoteService = NoteService;
exports.NoteService = NoteService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], NoteService);
//# sourceMappingURL=note.service.js.map