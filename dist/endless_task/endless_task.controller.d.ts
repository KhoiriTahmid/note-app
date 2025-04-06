import { EndlessTaskService } from './endless_task.service';
import { CreateEndlessTaskDTO, UpdateComplitedDatesDTO, UpdateEndlessTaskDTO } from './endless_task.schema';
export declare class EndlessTaskController {
    private endlessTaskService;
    constructor(endlessTaskService: EndlessTaskService);
    addEndlessTask(accountId: string, reqBody: CreateEndlessTaskDTO): Promise<{
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
    getWeeklyEndlessTask(accountId: string, plus: number, mines: number): Promise<{
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
    getEndlessTask(accountId: string, date: string): Promise<{
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
    updateEndlessTaskById(accountId: string, taskId: string, data: UpdateEndlessTaskDTO): Promise<{
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
    updateEndlessTaskCompleted(accountId: string, data: UpdateComplitedDatesDTO): Promise<{
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
