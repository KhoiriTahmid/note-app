import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import { createRepeatedTaskDTO, removeRepeatedTaskDTO, updateRepeatedTaskByIdDTO, updateStatusOrRemoveRepeatedTaskDTO } from './repeatedTask.schema';
import { successResponseMaker } from 'src/modelAndSchema/model';
import { CustomException } from 'src/common/customException';
import { getSundayAndSaturdayDate, validateAndReturnDate } from 'src/common/helper';

@Injectable()
export class RepeatedTaskService {
    constructor(
        private prismaService: PrismaService,
    ){}

    async createRepeatedTask(
        accountId: string,
        {dates, ...data}: createRepeatedTaskDTO
    ){
        const {id:repeatedTaskId, ...repeatedTask} = await this.prismaService.repeatedTask.create({data})
        const datas = dates.map(date=>({date, repeatedTaskId, accountId}))
        const res = await this.prismaService.relationNoteRepeatedTask.createMany({data:datas})
        return successResponseMaker(`success create ${res} repeated task`, res)
    }
    
        async getRepeatedTaskByDate(
            accountId: string,
            date: string
        ){
            const dateInFormat = validateAndReturnDate(date)
            const datas = await this.prismaService.relationNoteRepeatedTask.findMany({where:{accountId, date:dateInFormat}, omit:{accountId:true}})
            const ids = datas.map(e=>e.repeatedTaskId)
            const res = await this.prismaService.repeatedTask.findMany({where:{id:{in:ids}}, orderBy:{startTime:'asc'}})
    
            if(res.length !== ids.length) throw new InternalServerErrorException()
    
            const resInMap = new Map(res.map(({id, ...e})=>[id, e]))
    
            const value = datas.map(e=>({...e, ...resInMap.get(e.repeatedTaskId)}))
            resInMap.clear()
            return successResponseMaker("berhasil get", value)
        }
    
        async getWeeklyRepeatedTask(
            accountId: string,
            plus:number,
            mines:number
        ){
            const {sundayDate, saturdayDate} = getSundayAndSaturdayDate(plus, mines)
            
            const datas = await this.prismaService.relationNoteRepeatedTask.findMany({where:{accountId, date:{gte:sundayDate, lte:saturdayDate}}, omit:{accountId:true}, orderBy:{date:'asc'}})
            const ids = datas.map(e=>e.repeatedTaskId)
            const res = await this.prismaService.repeatedTask.findMany({where:{id:{in:ids}}})
    
            if(res.length !== ids.length) throw new InternalServerErrorException()
    
            const resInMap = new Map(res.map(({id, ...e})=>[id, e]))
    
            const value = datas.map(e=>({...e, ...resInMap.get(e.repeatedTaskId)}))
            resInMap.clear()

            let final: { [key: number]: typeof value } = {}; 
            for (const e of value) {
                if(!final[e.date.getDay()]) final[e.date.getDay()] = []
                final[e.date.getDay()].push(e)
            }
            
            for (let index = 0; index < 7; index++) {
                if(!final[index]){
                    final[index] = [];
                    continue;
                }

                final[index].sort((a,b)=>{
                    const secondA = Number(a.startTime?.substring(0,2))*3600 + Number(a.startTime?.substring(3,5))*60 + Number(a.startTime?.substring(6));
                    const secondB = Number(b.startTime?.substring(0,2))*3600 + Number(b.startTime?.substring(3,5))*60 + Number(b.startTime?.substring(6));
                    return secondA-secondB
                })
            }
            
            return successResponseMaker("berhasil get", final)
        }
    
    async updateRepeatedTask(
        id: string,
        data: updateRepeatedTaskByIdDTO
    ){
        if(Object.keys(data).length == 0) throw new CustomException(400, "Please provide data")
        const res = await this.prismaService.repeatedTask.update({where:{id}, data})
        return successResponseMaker("berhasil mengupdate repeated task", res)
    }

    async updateRepeatedTaskStatus(
        accountId: string,
        {date, repeatedTaskId}: updateStatusOrRemoveRepeatedTaskDTO
    ){
        const res = await this.prismaService.$executeRaw`
            UPDATE "RelationNoteRepeatedTask"
            SET "done" = NOT "done"
            WHERE "accountId" = ${accountId}
            AND "date" = ${date}
            AND "repeatedTaskId" = ${repeatedTaskId};
        `;

        return successResponseMaker("berhasil mengupdate repeated task", res)
    }

    async removeRepeatedTaskDate(
        accountId: string,
        {date, repeatedTaskId}: updateStatusOrRemoveRepeatedTaskDTO
    ){
        const res = await this.prismaService.relationNoteRepeatedTask.delete({omit:{accountId:true}, where:{date_repeatedTaskId_accountId:{accountId, date, repeatedTaskId}}})
        return successResponseMaker("berhasil remove date", res)
    }

    async removeRepeatedTask(
        id: removeRepeatedTaskDTO
    ){
        const res = await this.prismaService.repeatedTask.delete({where:{id}})
        return successResponseMaker("berhasil remove repeated task", res)
    }
}
