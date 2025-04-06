import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { Logger } from "winston";
export declare class LoggerInterceptor implements NestInterceptor {
    private logger;
    constructor(logger: Logger);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
