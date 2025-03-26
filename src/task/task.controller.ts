import { Body, Controller, DefaultValuePipe, Get, Inject, Param, ParseIntPipe, ParseUUIDPipe, Post, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { TaskService } from './task.service';
import { LoggerInterceptor } from 'src/common/logger.interseceptor';
import { AuthnGuard } from 'src/common/authn.guard';
import { AuthzGuard } from 'src/common/authz.guard';
import { CreateTaskDTO, CreateTaskSchema, UpdateTaskDTO, UpdateTaskSchema } from './task.schema';
import { ValidationService } from 'src/common/validation.service';
import { GetUser } from 'src/common/GetUser';

@UseGuards(AuthnGuard, AuthzGuard)
@UseInterceptors(LoggerInterceptor)
@Controller('/api/task')
export class TaskController {
    constructor(@Inject() private taskService: TaskService){}

    @Post()
    async createTask(
        @Body(new ValidationService(CreateTaskSchema)) reqBody: CreateTaskDTO,
        @GetUser("id") accountId: string
    ){
        return await this.taskService.createTask(accountId, reqBody);
    }
    
    @Post("/update/:taskId")
    async updateTask(
        @Body(new ValidationService(UpdateTaskSchema)) reqBody: UpdateTaskDTO,
        @GetUser("id") accountId: string,
        @Param('taskId', new ParseUUIDPipe()) taskId: string
    ){
        return await this.taskService.updateTask(accountId, taskId, reqBody);
    }
    
    @Get("/week")
    async getWeeklyTasksByDate(
        @GetUser("id") accountId: string,
        @Query("plus", new DefaultValuePipe(0), new ParseIntPipe()) plus: number,
        @Query("mines", new DefaultValuePipe(0), new ParseIntPipe()) mines: number,
    ){
        return await this.taskService.getWeeklyTasksByDate(accountId, plus, mines);
    }

    @Get("/:date")
    async getOneTask(@Param("date") date: string, @GetUser("id") accountId: string){
        return await this.taskService.getTasksByDate(accountId, date);
    }
    
}
