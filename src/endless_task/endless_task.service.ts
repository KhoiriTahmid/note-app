import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import { CreateEndlessTaskDTO, UpdateComplitedDatesDTO, UpdateEndlessTaskDTO } from './endless_task.schema';
import { successResponseMaker } from 'src/modelAndSchema/model';
import { CustomException } from 'src/common/customException';
import { getSundayAndSaturdayDate, validateAndReturnDate } from 'src/common/helper';

@Injectable()
export class EndlessTaskService {
    constructor(private prismaService: PrismaService){}

    async createEndlessTask(accountId: string, data: CreateEndlessTaskDTO){
        const result = await this.prismaService.endlessTask.create({
            omit:{accountId:true},
            data:{...data, accountId}});
        return successResponseMaker("success create endless task.", result);
    }

    async updateEndlessTask(accountId: string, taskId: string, data: UpdateEndlessTaskDTO){
        console.info(data)
        if (Object.keys(data).length==0) throw new CustomException(400, "please provide")
        const result = await this.prismaService.endlessTask.update({where:{accountId, id:taskId}, data, omit:{accountId:true}})
        return successResponseMaker("success update task.", result);
    }

    async getEndlessTasksByDate(accountId: string, date: string){
        const dateInFormat = validateAndReturnDate(date);

        const dateInArr = [dateInFormat.getDay(), dateInFormat.getDate(), dateInFormat.getMonth()+1]

        const result = await this.prismaService.$queryRaw`
        SELECT "id", "text", "startDate", "repeatType", "startTime", "endTime" 
        FROM "EndlessTask" WHERE "accountId" = ${accountId}
        AND ("repeatType"='daily' 
            OR ("repeatType"='weekly' AND EXTRACT(DOW FROM "startDate") = ${dateInArr[0]})
            OR ("repeatType"='yearly' AND EXTRACT(DAY FROM "startDate") = ${dateInArr[1]} AND EXTRACT(Month FROM "startDate") = ${dateInArr[2]}) 
            OR ("repeatType"='monthly' AND EXTRACT(DAY FROM "startDate") = ${dateInArr[1]}) 
        )`;

        return successResponseMaker("",result)
    }

    async getWeeklyEndlessTasks(accountId: string, plus:number, mines: number){
        const {sundayDate, saturdayDate} = getSundayAndSaturdayDate(plus, mines);

        type Obj = {
            id: string;
            text: string;
            startTime: string;
            endTime: string;
            startDate: Date;
            repeatType: "daily" | "weekly" | "monthly" | "yearly";
          };
          
        const sunDate = sundayDate.getUTCDate()
        const satDate = saturdayDate.getUTCDate()

        const result = await this.prismaService.$queryRaw<Obj[]>`
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

        let data: Record<number, Obj[]> = {0:[], 1:[], 2:[], 3:[], 4:[], 5:[], 6:[]}
        
        result.forEach(e=>{
            if (e.repeatType=="daily") {
                for (const key in data) {
                    data[key].push(e);
                }
            }else if(e.repeatType=="weekly"){
                data[e.startDate.getDay()].push(e);
            }else{

                if (e.startDate.getUTCDate() >= sunDate) {
                    const dummyDate = new Date(sundayDate)
                    const gap = e.startDate.getUTCDate() - dummyDate.getUTCDate()
                    dummyDate.setUTCDate(dummyDate.getUTCDate()+gap)
                    data[dummyDate.getUTCDay()].push(e)
                }else{
                    const dummyDate = new Date(saturdayDate)
                    const gap = dummyDate.getUTCDate() - e.startDate.getUTCDate();
                    dummyDate.setUTCDate(dummyDate.getUTCDate()-gap)
                    data[dummyDate.getUTCDay()].push(e)
                }
            }

        })

        return successResponseMaker("success get weekly endless tasks",data)
    }

    async updateComplitedDates(accountId: string, data: UpdateComplitedDatesDTO){
        const res = await this.prismaService.relationEndlessCompleted.create({ data:{accountId, ...data}, omit:{accountId:true}})
        return successResponseMaker("success update status", res)
    }
}
