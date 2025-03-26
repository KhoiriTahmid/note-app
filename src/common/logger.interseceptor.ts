import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Observable, tap } from "rxjs";
import { Logger } from "winston";

@Injectable()
export class LoggerInterceptor implements NestInterceptor{
    constructor(@Inject(WINSTON_MODULE_PROVIDER) private logger: Logger){}
    intercept(context: ExecutionContext, next: CallHandler):Observable<any>{
        const {url, body, method} = context.switchToHttp().getRequest()
        this.logger.info(`Request: ${method} ${url} data:${JSON.stringify(body)}`)

        return next.handle().pipe(
            tap(()=> this.logger.info(`Response: ${method} ${url} `))
        )
    }
}