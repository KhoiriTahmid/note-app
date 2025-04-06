import { HttpException } from "@nestjs/common";
export declare class CustomException extends HttpException {
    constructor(code: number, message: string, errors?: any);
}
