import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import { CreateNoteDTO, UpdateNoteDTO } from './note.schema';
import { CustomException } from 'src/common/customException';
import { successResponseMaker } from 'src/modelAndSchema/model';
import { getSundayAndSaturdayDate, validateAndReturnDate } from 'src/common/helper';

@Injectable()
export class NoteService {
    constructor(
        private prismaService: PrismaService,
    ){}

    
    async createNote(accountId: string, data: CreateNoteDTO){
        const findRes = await this.prismaService.note.findUnique({where:{accountId_date:{accountId, date:data.date}}})
        if (findRes) throw new CustomException(HttpStatus.FORBIDDEN, "Note in same date already exist");
        const res = await this.prismaService.note.create({data:{...data, accountId}, omit:{accountId:true}});

        return successResponseMaker("success created new note.", res);
    }

    async getNoteByDate (date:string, accountId:string){
        const dateInFormat = validateAndReturnDate(date);
        const findRes = await this.prismaService.note.findUnique({where:{accountId_date:{accountId, date:dateInFormat}}, omit:{accountId:true}})
        if (!findRes) throw new CustomException(HttpStatus.NOT_FOUND, "Note didnt exist.");

        return successResponseMaker("success find note.", findRes);
    }
    async getWeeklyNoteByDate(accountId: string, plus:number, mines: number){
        const {sundayDate, saturdayDate} =  getSundayAndSaturdayDate(plus, mines)

        const findRes = await this.prismaService.note.findMany({where:{AND:[{accountId},{date:{gte:sundayDate, lte:saturdayDate}}]}, omit:{accountId:true}})
        if (!findRes) throw new CustomException(HttpStatus.NOT_FOUND, "Note didnt exist.");
        const map = new Map(findRes.map(e=>([e.date.getDay(), e])))
        let week = {}
        for (let index = 0; index < 7; index++) {
            week[index] = map.get(index) || null   
        }
        map.clear()
        return successResponseMaker("success find note.", week);
    }
    
    async updateNote(date:string, accountId:string,{label, text, files}: UpdateNoteDTO){
        const dateInFormat = validateAndReturnDate(date);

        let data = {};
        if(label) data['label']=label;
        if(text) data['text']=text;
        if(files) data['files'] = {push:files};

        if(!Object.keys(data).length) throw new CustomException(400, "No data passed. Please give at least one data")

        const res = await this.prismaService.note.update({where:{accountId_date:{accountId, date:dateInFormat}}, data, omit:{accountId:true}});
        return successResponseMaker("success update note", res)
    }

}
