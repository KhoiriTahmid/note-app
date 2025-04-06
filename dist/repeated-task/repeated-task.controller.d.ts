import { RepeatedTaskService } from './repeated-task.service';
import { createRepeatedTaskDTO, updateRepeatedTaskByIdDTO, updateStatusOrRemoveRepeatedTaskDTO } from './repeatedTask.schema';
export declare class RepeatedTaskController {
    private repeatedTaskService;
    constructor(repeatedTaskService: RepeatedTaskService);
    createRepeatedTask(reqBody: createRepeatedTaskDTO, accountId: string): Promise<{
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
    getRepeatedTask(accountId: string, date: string): Promise<{
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
    updateRepeatedTask(id: string, reqBody: updateRepeatedTaskByIdDTO): Promise<{
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
    updateStatusRepeatedTask(accountId: string, reqBody: updateStatusOrRemoveRepeatedTaskDTO): Promise<{
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
