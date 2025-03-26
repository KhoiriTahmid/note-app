import { HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import { CreateTaskDTO, UpdateTaskDTO } from './task.schema';
import { successResponseMaker } from 'src/modelAndSchema/model';
import { CustomException } from 'src/common/customException';
import { getSundayAndSaturdayDate, validateAndReturnDate } from 'src/common/helper';

@Injectable()
export class TaskService {
    constructor(
        private prismaService: PrismaService,
    ){}

    async createTask(accountId: string, data: CreateTaskDTO){
        const res = await this.prismaService.task.create({data:{...data, accountId}, omit:{accountId:true}});
        if(!res) throw new CustomException(HttpStatus.NOT_FOUND, "Tasks didnt exist.");
        return successResponseMaker("Success createing new task", res);
    }

    async updateTask(accountId: string, taskId:string, data: UpdateTaskDTO){
        if (Object.keys(data).length==0) throw new CustomException(400, "Please provide at least one updated field data")

        const res = await this.prismaService.task.update({where:{accountId, id:taskId}, data, omit:{accountId:true}});
        if(!res) throw new CustomException(HttpStatus.NOT_FOUND, "Tasks didnt exist.");
        return successResponseMaker("Success Updating a task", res);
    }

    async getTasksByDate(accountId: string, date:string){
        const dateInFormat = validateAndReturnDate(date);

        const noteId = await this.prismaService.note.findUnique({
            where:{accountId_date:{accountId, date:dateInFormat}},
            select:{id: true}
        })
        if(!noteId?.id) throw new CustomException(HttpStatus.NOT_FOUND, "Tasks didnt exist.");

        const res = await this.prismaService.task.findMany({
            where:{accountId, noteId:noteId.id}, 
            orderBy:{startTime:'asc'}, 
            omit:{accountId:true}
        });
        if(res.length == 0) throw new CustomException(HttpStatus.NOT_FOUND, "Tasks didnt exist.");
        return successResponseMaker("Success get a day tasks", res);

    }

    async getWeeklyTasksByDate(accountId: string, plus: number, mines: number){
        const {sundayDate, saturdayDate} = getSundayAndSaturdayDate(plus, mines);
        const idsAndDates = await this.prismaService.note.findMany({where:{accountId, date:{gte:sundayDate, lte:saturdayDate}}, select:{id:true, date: true}, orderBy:{date:'asc'}})
        if(idsAndDates.length==0) throw new CustomException(HttpStatus.NOT_FOUND, "Notes didnt exist.");

        const res = await this.prismaService.task.findMany({where:{accountId, noteId:{in:idsAndDates.map(e=>e.id)}}, orderBy:{startTime:'asc'}, omit:{accountId:true}});
        if (res.length==0) throw new CustomException(HttpStatus.NOT_FOUND, "Tasks didnt exist.");

        const infoMap = new Map(idsAndDates.map(e=>([e.id, e.date])))
        let map = new Map()

        for (const e of res) {
            const day = infoMap.get(e.noteId)?.getUTCDay();
            if(day == undefined) continue;
            
            if(!map.has(day)) map.set(day, []);
            map.get(day).push(e)
        }

        let sortedRes = {}
        for (let index = 0; index < 7; index++) {
            sortedRes[index] = map.get(index) ?? []
        }

        infoMap.clear()
        map.clear()

        return successResponseMaker("Success get a day tasks", sortedRes);
    }
}
