import { PrismaService } from 'src/common/prisma.service';
import { AccountLoginDTO, AccountSignupDto } from "./account.schema";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from '@nestjs/config';
export declare class AccountService {
    private prismaService;
    private configService;
    private jwtService;
    constructor(prismaService: PrismaService, configService: ConfigService, jwtService: JwtService);
    signUp({ username, email, password, role }: AccountSignupDto): Promise<{
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
    updateAccount({ id, email, username }: {
        id: string;
        email?: string;
        username?: string;
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
    forgetPassword(id: string, password: string): Promise<{
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
    deleteUser(key?: string): Promise<import("@prisma/client").Prisma.BatchPayload>;
    login({ usernameOrEmail, password }: AccountLoginDTO): Promise<{
        refresh_token: string;
        response: {
            success: boolean;
            message: string;
            data: any;
            page: any;
        } | {
            success: boolean;
            message: string;
            data: any;
            page?: undefined;
        };
    }>;
}
