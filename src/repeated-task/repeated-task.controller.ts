import { Body, Controller, Get, Inject, Param, ParseIntPipe, ParseUUIDPipe, Post, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { RepeatedTaskService } from './repeated-task.service';
import { ValidationService } from 'src/common/validation.service';
import { createRepeatedTaskDTO, createRepeatedTaskSchema, updateRepeatedTaskById, updateRepeatedTaskByIdDTO, updateStatusOrRemoveRepeatedTask, updateStatusOrRemoveRepeatedTaskDTO } from './repeatedTask.schema';
import { GetUser } from 'src/common/GetUser';
import { AuthnGuard } from 'src/common/authn.guard';
import { AuthzGuard } from 'src/common/authz.guard';
import { LoggerInterceptor } from 'src/common/logger.interseceptor';

@Controller('api/repeated-task')
@UseGuards(AuthnGuard, AuthzGuard)
@UseInterceptors(LoggerInterceptor)
export class RepeatedTaskController {
    constructor(
        @Inject() private repeatedTaskService: RepeatedTaskService
    ){}

    @Post()
    async createRepeatedTask(
        @Body(new ValidationService(createRepeatedTaskSchema)) reqBody: createRepeatedTaskDTO,
        @GetUser('id') accountId: string
    ){
        return await this.repeatedTaskService.createRepeatedTask(accountId, reqBody)
    }

    @Get('/week')
    async getWeeklyRepeatedTask(
        @GetUser('id') accountId: string,
        @Query('plus', ParseIntPipe) plus:number,
        @Query('mines', ParseIntPipe) mines:number,
    ){
        return await this.repeatedTaskService.getWeeklyRepeatedTask(accountId, plus, mines);
    }

    @Get('/:date')
    async getRepeatedTask(
        @GetUser('id') accountId: string,
        @Param('date') date: string
    ){
        return await this.repeatedTaskService.getRepeatedTaskByDate(accountId, date)
    }

    @Post('update/task/:id')
    async updateRepeatedTask(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body(new ValidationService(updateRepeatedTaskById)) reqBody: updateRepeatedTaskByIdDTO
    ){
        return await this.repeatedTaskService.updateRepeatedTask(id, reqBody)
    }

    @Post('update/status/:date')
    async updateStatusRepeatedTask(
        @GetUser('id') accountId: string,
        @Body(new ValidationService(updateStatusOrRemoveRepeatedTask)) reqBody: updateStatusOrRemoveRepeatedTaskDTO
    ){
        return await this.repeatedTaskService.updateRepeatedTaskStatus(accountId, reqBody)
    }
}
