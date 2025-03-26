import { Body, Controller, DefaultValuePipe, Get, Inject, Param, ParseIntPipe, Post, Query, Req, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import { NoteService } from './note.service';
import { GetUser } from 'src/common/GetUser';
import { AuthnGuard } from 'src/common/authn.guard';
import { AuthzGuard } from 'src/common/authz.guard';
import { LoggerInterceptor } from 'src/common/logger.interseceptor';
import { CreateNoteDTO, CreateNoteSchema, UpdateNoteDTO, UpdateNoteSchema } from './note.schema';
import { ValidationService } from 'src/common/validation.service';
import { Roles } from 'src/common/Role';


@Roles("admin", "user")
@UseGuards(AuthnGuard, AuthzGuard)
@UseInterceptors(LoggerInterceptor)
@Controller('/api/note')
export class NoteController {
    constructor(@Inject() private noteService: NoteService){}

    @Get("/week")
    async getNoteWeekly(
        @Query('plus', new DefaultValuePipe(0), new ParseIntPipe()) plus:number, 
        @Query('mines', new DefaultValuePipe(0), new ParseIntPipe()) mines:number, 
        @GetUser('id') accountId:string){
        return this.noteService.getWeeklyNoteByDate(accountId, plus, mines);
    }

    @Get(":date")
    async getNoteByDate(@Param('date') date:string, @GetUser('id') accountId:string){
        return this.noteService.getNoteByDate(date,accountId);
    }

    @Post()
    async createNote(
        @Body(new ValidationService(CreateNoteSchema)) reqBody: CreateNoteDTO, 
        @GetUser('id') accountId: string){
        return this.noteService.createNote(accountId, reqBody);
    }

    @Post("/update/:date")
    async updateNote(
        @Body(new ValidationService(UpdateNoteSchema)) reqBody: UpdateNoteDTO,
        @Param('date') date: string, 
        @GetUser('id') accountId: string
        ){
        return this.noteService.updateNote(date, accountId, reqBody);
    }
}
