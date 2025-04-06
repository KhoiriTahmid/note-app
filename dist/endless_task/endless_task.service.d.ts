import { PrismaService } from 'src/common/prisma.service';
import { CreateEndlessTaskDTO, UpdateComplitedDatesDTO, UpdateEndlessTaskDTO } from './endless_task.schema';
export declare class EndlessTaskService {
    private prismaService;
    constructor(prismaService: PrismaService);
    createEndlessTask(accountId: string, data: CreateEndlessTaskDTO): Promise<{
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
    updateEndlessTask(accountId: string, taskId: string, data: UpdateEndlessTaskDTO): Promise<{
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
    getEndlessTasksByDate(accountId: string, date: string): Promise<{
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
    getWeeklyEndlessTasks(accountId: string, plus: number, mines: number): Promise<{
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
    updateComplitedDates(accountId: string, data: UpdateComplitedDatesDTO): Promise<{
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
