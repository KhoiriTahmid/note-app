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
exports.EndlessTaskService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma.service");
const model_1 = require("../modelAndSchema/model");
const customException_1 = require("../common/customException");
const helper_1 = require("../common/helper");
let EndlessTaskService = class EndlessTaskService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async createEndlessTask(accountId, data) {
        const result = await this.prismaService.endlessTask.create({
            omit: { accountId: true },
            data: { ...data, accountId }
        });
        return (0, model_1.successResponseMaker)("success create endless task.", result);
    }
    async updateEndlessTask(accountId, taskId, data) {
        console.info(data);
        if (Object.keys(data).length == 0)
            throw new customException_1.CustomException(400, "please provide");
        const result = await this.prismaService.endlessTask.update({ where: { accountId, id: taskId }, data, omit: { accountId: true } });
        return (0, model_1.successResponseMaker)("success update task.", result);
    }
    async getEndlessTasksByDate(accountId, date) {
        const dateInFormat = (0, helper_1.validateAndReturnDate)(date);
        const dateInArr = [dateInFormat.getDay(), dateInFormat.getDate(), dateInFormat.getMonth() + 1];
        const result = await this.prismaService.$queryRaw `
        SELECT "id", "text", "startDate", "repeatType", "startTime", "endTime" 
        FROM "EndlessTask" WHERE "accountId" = ${accountId}
        AND ("repeatType"='daily' 
            OR ("repeatType"='weekly' AND EXTRACT(DOW FROM "startDate") = ${dateInArr[0]})
            OR ("repeatType"='yearly' AND EXTRACT(DAY FROM "startDate") = ${dateInArr[1]} AND EXTRACT(Month FROM "startDate") = ${dateInArr[2]}) 
            OR ("repeatType"='monthly' AND EXTRACT(DAY FROM "startDate") = ${dateInArr[1]}) 
        )`;
        return (0, model_1.successResponseMaker)("", result);
    }
    async getWeeklyEndlessTasks(accountId, plus, mines) {
        const { sundayDate, saturdayDate } = (0, helper_1.getSundayAndSaturdayDate)(plus, mines);
        const sunDate = sundayDate.getUTCDate();
        const satDate = saturdayDate.getUTCDate();
        const result = await this.prismaService.$queryRaw `
        SELECT "id", "text", "startDate", "repeatType", "startTime", "endTime" 
        FROM "EndlessTask" WHERE "accountId" = ${accountId}
        AND ("repeatType"='daily' OR "repeatType"='weekly'
            OR (
                ("repeatType" = 'monthly' OR "repeatType" = 'yearly') 
                AND (
                    (${sunDate} <= ${satDate} 
                        AND EXTRACT(DAY FROM "startDate") BETWEEN ${sunDate} AND ${satDate}
                    )
                    OR (${sunDate} > ${satDate} 
                        AND (
                            EXTRACT(DAY FROM "startDate") >= ${sunDate} 
                            OR EXTRACT(DAY FROM "startDate") <= ${satDate}
                        )
                    )
                )
            )
        )`;
        let data = { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] };
        result.forEach(e => {
            if (e.repeatType == "daily") {
                for (const key in data) {
                    data[key].push(e);
                }
            }
            else if (e.repeatType == "weekly") {
                data[e.startDate.getDay()].push(e);
            }
            else {
                if (e.startDate.getUTCDate() >= sunDate) {
                    const dummyDate = new Date(sundayDate);
                    const gap = e.startDate.getUTCDate() - dummyDate.getUTCDate();
                    dummyDate.setUTCDate(dummyDate.getUTCDate() + gap);
                    data[dummyDate.getUTCDay()].push(e);
                }
                else {
                    const dummyDate = new Date(saturdayDate);
                    const gap = dummyDate.getUTCDate() - e.startDate.getUTCDate();
                    dummyDate.setUTCDate(dummyDate.getUTCDate() - gap);
                    data[dummyDate.getUTCDay()].push(e);
                }
            }
        });
        return (0, model_1.successResponseMaker)("success get weekly endless tasks", data);
    }
    async updateComplitedDates(accountId, data) {
        const res = await this.prismaService.relationEndlessCompleted.create({ data: { accountId, ...data }, omit: { accountId: true } });
        return (0, model_1.successResponseMaker)("success update status", res);
    }
};
exports.EndlessTaskService = EndlessTaskService;
exports.EndlessTaskService = EndlessTaskService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EndlessTaskService);
//# sourceMappingURL=endless_task.service.js.map