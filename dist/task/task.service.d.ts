import { PrismaService } from 'src/common/prisma.service';
import { CreateTaskDTO, UpdateTaskDTO } from './task.schema';
export declare class TaskService {
    private prismaService;
    constructor(prismaService: PrismaService);
    createTask(accountId: string, data: CreateTaskDTO): Promise<{
        success: boolean;
        message: string;
        data: any;
        page: any;
    } | {
        success: boolean;
        message: string;
        data: any;
        page?: undefined;
    }>;
    updateTask(accountId: string, taskId: string, data: UpdateTaskDTO): Promise<{
        success: boolean;
        message: string;
        data: any;
        page: any;
    } | {
        success: boolean;
        message: string;
        data: any;
        page?: undefined;
    }>;
    getTasksByDate(accountId: string, date: string): Promise<{
        success: boolean;
        message: string;
        data: any;
        page: any;
    } | {
        success: boolean;
        message: string;
        data: any;
        page?: undefined;
    }>;
    getWeeklyTasksByDate(accountId: string, plus: number, mines: number): Promise<{
        success: boolean;
        message: string;
        data: any;
        page: any;
    } | {
        success: boolean;
        message: string;
        data: any;
        page?: undefined;
    }>;
}
