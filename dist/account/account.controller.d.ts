import { AccountService } from './account.service';
import { AccountLoginDTO, AccountSignupDto, AccountUpdateDTO } from './account.schema';
import { Request, Response } from 'express';
export declare class AccountController {
    private accountService;
    constructor(accountService: AccountService);
    create(req: AccountSignupDto): Promise<{
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
    login(req: AccountLoginDTO, res: Response): Promise<Response<any, Record<string, any>>>;
    updateAccount(req: Request & {
        user: {
            id: string;
        };
        body: AccountUpdateDTO;
    }): Promise<{
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
    forgetPassword(req: Request & {
        user: {
            id: string;
        };
        body: {
            id: string;
            password: string;
        };
    }): Promise<{
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
    getAccountById(id: string): Promise<{
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
    getAllAccount(): Promise<{
        username: string;
        password: string;
        email: string;
        role: import("@prisma/client").$Enums.Role;
        id: string;
    }[]>;
    deleteAccount(): Promise<import("@prisma/client").Prisma.BatchPayload>;
}
