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
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma.service");
const model_1 = require("../modelAndSchema/model");
const customException_1 = require("../common/customException");
const helper_1 = require("../common/helper");
let TaskService = class TaskService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async createTask(accountId, data) {
        const res = await this.prismaService.task.create({ data: { ...data, accountId }, omit: { accountId: true } });
        if (!res)
            throw new customException_1.CustomException(common_1.HttpStatus.NOT_FOUND, "Tasks didnt exist.");
        return (0, model_1.successResponseMaker)("Success createing new task", res);
    }
    async updateTask(accountId, taskId, data) {
        if (Object.keys(data).length == 0)
            throw new customException_1.CustomException(400, "Please provide at least one updated field data");
        const res = await this.prismaService.task.update({ where: { accountId, id: taskId }, data, omit: { accountId: true } });
        if (!res)
            throw new customException_1.CustomException(common_1.HttpStatus.NOT_FOUND, "Tasks didnt exist.");
        return (0, model_1.successResponseMaker)("Success Updating a task", res);
    }
    async getTasksByDate(accountId, date) {
        const dateInFormat = (0, helper_1.validateAndReturnDate)(date);
        const noteId = await this.prismaService.note.findUnique({
            where: { accountId_date: { accountId, date: dateInFormat } },
            select: { id: true }
        });
        if (!noteId?.id)
            throw new customException_1.CustomException(common_1.HttpStatus.NOT_FOUND, "Tasks didnt exist.");
        const res = await this.prismaService.task.findMany({
            where: { accountId, noteId: noteId.id },
            orderBy: { startTime: 'asc' },
            omit: { accountId: true }
        });
        if (res.length == 0)
            throw new customException_1.CustomException(common_1.HttpStatus.NOT_FOUND, "Tasks didnt exist.");
        return (0, model_1.successResponseMaker)("Success get a day tasks", res);
    }
    async getWeeklyTasksByDate(accountId, plus, mines) {
        const { sundayDate, saturdayDate } = (0, helper_1.getSundayAndSaturdayDate)(plus, mines);
        const idsAndDates = await this.prismaService.note.findMany({ where: { accountId, date: { gte: sundayDate, lte: saturdayDate } }, select: { id: true, date: true }, orderBy: { date: 'asc' } });
        if (idsAndDates.length == 0)
            throw new customException_1.CustomException(common_1.HttpStatus.NOT_FOUND, "Notes didnt exist.");
        const res = await this.prismaService.task.findMany({ where: { accountId, noteId: { in: idsAndDates.map(e => e.id) } }, orderBy: { startTime: 'asc' }, omit: { accountId: true } });
        if (res.length == 0)
            throw new customException_1.CustomException(common_1.HttpStatus.NOT_FOUND, "Tasks didnt exist.");
        const infoMap = new Map(idsAndDates.map(e => ([e.id, e.date])));
        let map = new Map();
        for (const e of res) {
            const day = infoMap.get(e.noteId)?.getUTCDay();
            if (day == undefined)
                continue;
            if (!map.has(day))
                map.set(day, []);
            map.get(day).push(e);
        }
        let sortedRes = {};
        for (let index = 0; index < 7; index++) {
            sortedRes[index] = map.get(index) ?? [];
        }
        infoMap.clear();
        map.clear();
        return (0, model_1.successResponseMaker)("Success get a day tasks", sortedRes);
    }
};
exports.TaskService = TaskService;
exports.TaskService = TaskService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TaskService);
//# sourceMappingURL=task.service.js.map