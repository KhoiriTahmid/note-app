import { Body, Controller, DefaultValuePipe, Get, Inject, Param, ParseIntPipe, ParseUUIDPipe, Post, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { GetUser } from 'src/common/GetUser';
import { EndlessTaskService } from './endless_task.service';
import { CreateEndlessTaskDTO, CreateEndlessTaskSchema, UpdateComplitedDatesDTO, UpdateComplitedDatesSchema, UpdateEndlessTaskDTO, UpdateEndlessTaskSchema } from './endless_task.schema';
import { ValidationService } from 'src/common/validation.service';
import { AuthnGuard } from 'src/common/authn.guard';
import { AuthzGuard } from 'src/common/authz.guard';
import { LoggerInterceptor } from 'src/common/logger.interseceptor';

@UseGuards(AuthnGuard, AuthzGuard)
@UseInterceptors(LoggerInterceptor)
@Controller('api/endlessTask')
export class EndlessTaskController {
    constructor(@Inject() private endlessTaskService: EndlessTaskService){}

    @Post()
    async addEndlessTask(
        @GetUser('id') accountId:string,
        @Body(new ValidationService(CreateEndlessTaskSchema)) reqBody: CreateEndlessTaskDTO
    ){
        console.info(reqBody)
        return this.endlessTaskService.createEndlessTask(accountId, reqBody);
    }

    @Get("/week")
    async getWeeklyEndlessTask(
        @GetUser('id') accountId:string,
        @Query('plus', new DefaultValuePipe(0), new ParseIntPipe()) plus:number, 
        @Query('mines', new DefaultValuePipe(0), new ParseIntPipe()) mines:number, 
    ){
        return await this.endlessTaskService.getWeeklyEndlessTasks(accountId, plus, mines);
    }

    @Get("/:date")
    async getEndlessTask(
        @GetUser('id') accountId:string,
        @Param('date') date:string
    ){
        return await this.endlessTaskService.getEndlessTasksByDate(accountId, date);
    }

    @Post("update/:id")
    async updateEndlessTaskById(
        @GetUser('id') accountId: string,
        @Param('id', new ParseUUIDPipe()) taskId:string,
        @Body(new ValidationService(UpdateEndlessTaskSchema)) data: UpdateEndlessTaskDTO
    ){
        return await this.endlessTaskService.updateEndlessTask(accountId, taskId, data)
    }
    @Post("update-status/")
    async updateEndlessTaskCompleted(
        @GetUser('id') accountId: string,
        @Body(new ValidationService(UpdateComplitedDatesSchema)) data: UpdateComplitedDatesDTO
    ){
        return await this.endlessTaskService.updateComplitedDates(accountId, data);
    }

}
