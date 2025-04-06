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
exports.RepeatedTaskService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma.service");
const model_1 = require("../modelAndSchema/model");
const customException_1 = require("../common/customException");
const helper_1 = require("../common/helper");
let RepeatedTaskService = class RepeatedTaskService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async createRepeatedTask(accountId, { dates, ...data }) {
        const { id: repeatedTaskId, ...repeatedTask } = await this.prismaService.repeatedTask.create({ data });
        const datas = dates.map(date => ({ date, repeatedTaskId, accountId }));
        const res = await this.prismaService.relationNoteRepeatedTask.createMany({ data: datas });
        return (0, model_1.successResponseMaker)(`success create ${res} repeated task`, res);
    }
    async getRepeatedTaskByDate(accountId, date) {
        const dateInFormat = (0, helper_1.validateAndReturnDate)(date);
        const datas = await this.prismaService.relationNoteRepeatedTask.findMany({ where: { accountId, date: dateInFormat }, omit: { accountId: true } });
        const ids = datas.map(e => e.repeatedTaskId);
        const res = await this.prismaService.repeatedTask.findMany({ where: { id: { in: ids } }, orderBy: { startTime: 'asc' } });
        if (res.length !== ids.length)
            throw new common_1.InternalServerErrorException();
        const resInMap = new Map(res.map(({ id, ...e }) => [id, e]));
        const value = datas.map(e => ({ ...e, ...resInMap.get(e.repeatedTaskId) }));
        resInMap.clear();
        return (0, model_1.successResponseMaker)("berhasil get", value);
    }
    async getWeeklyRepeatedTask(accountId, plus, mines) {
        const { sundayDate, saturdayDate } = (0, helper_1.getSundayAndSaturdayDate)(plus, mines);
        const datas = await this.prismaService.relationNoteRepeatedTask.findMany({ where: { accountId, date: { gte: sundayDate, lte: saturdayDate } }, omit: { accountId: true }, orderBy: { date: 'asc' } });
        const ids = datas.map(e => e.repeatedTaskId);
        const res = await this.prismaService.repeatedTask.findMany({ where: { id: { in: ids } } });
        const resInMap = new Map(res.map(({ id, ...e }) => [id, e]));
        const value = datas.map(e => ({ ...e, ...resInMap.get(e.repeatedTaskId) }));
        resInMap.clear();
        let final = {};
        for (const e of value) {
            if (!final[e.date.getDay()])
                final[e.date.getDay()] = [];
            final[e.date.getDay()].push(e);
        }
        for (let index = 0; index < 7; index++) {
            if (!final[index]) {
                final[index] = [];
                continue;
            }
            final[index].sort((a, b) => {
                const secondA = Number(a.startTime?.substring(0, 2)) * 3600 + Number(a.startTime?.substring(3, 5)) * 60 + Number(a.startTime?.substring(6));
                const secondB = Number(b.startTime?.substring(0, 2)) * 3600 + Number(b.startTime?.substring(3, 5)) * 60 + Number(b.startTime?.substring(6));
                return secondA - secondB;
            });
        }
        return (0, model_1.successResponseMaker)("berhasil get", final);
    }
    async updateRepeatedTask(id, data) {
        if (Object.keys(data).length == 0)
            throw new customException_1.CustomException(400, "Please provide data");
        const res = await this.prismaService.repeatedTask.update({ where: { id }, data });
        return (0, model_1.successResponseMaker)("berhasil mengupdate repeated task", res);
    }
    async updateRepeatedTaskStatus(accountId, { date, repeatedTaskId }) {
        const res = await this.prismaService.$executeRaw `
            UPDATE "RelationNoteRepeatedTask"
            SET "done" = NOT "done"
            WHERE "accountId" = ${accountId}
            AND "date" = ${date}
            AND "repeatedTaskId" = ${repeatedTaskId};
        `;
        return (0, model_1.successResponseMaker)("berhasil mengupdate repeated task", res);
    }
    async removeRepeatedTaskDate(accountId, { date, repeatedTaskId }) {
        const res = await this.prismaService.relationNoteRepeatedTask.delete({ omit: { accountId: true }, where: { date_repeatedTaskId_accountId: { accountId, date, repeatedTaskId } } });
        return (0, model_1.successResponseMaker)("berhasil remove date", res);
    }
    async removeRepeatedTask(id) {
        const res = await this.prismaService.repeatedTask.delete({ where: { id } });
        return (0, model_1.successResponseMaker)("berhasil remove repeated task", res);
    }
};
exports.RepeatedTaskService = RepeatedTaskService;
exports.RepeatedTaskService = RepeatedTaskService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RepeatedTaskService);
//# sourceMappingURL=repeated-task.service.js.map