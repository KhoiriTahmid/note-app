import { PrismaService } from 'src/common/prisma.service';
import { createRepeatedTaskDTO, removeRepeatedTaskDTO, updateRepeatedTaskByIdDTO, updateStatusOrRemoveRepeatedTaskDTO } from './repeatedTask.schema';
export declare class RepeatedTaskService {
    private prismaService;
    constructor(prismaService: PrismaService);
    createRepeatedTask(accountId: string, { dates, ...data }: createRepeatedTaskDTO): Promise<{
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
    getRepeatedTaskByDate(accountId: string, date: string): Promise<{
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
    getWeeklyRepeatedTask(accountId: string, plus: number, mines: number): Promise<{
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
    updateRepeatedTask(id: string, data: updateRepeatedTaskByIdDTO): Promise<{
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
    updateRepeatedTaskStatus(accountId: string, { date, repeatedTaskId }: updateStatusOrRemoveRepeatedTaskDTO): Promise<{
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
    removeRepeatedTaskDate(accountId: string, { date, repeatedTaskId }: updateStatusOrRemoveRepeatedTaskDTO): Promise<{
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
    removeRepeatedTask(id: removeRepeatedTaskDTO): Promise<{
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
