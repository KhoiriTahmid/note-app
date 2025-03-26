import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ZodError } from "zod";

@Catch(HttpException, ZodError, PrismaClientKnownRequestError)
export class ErrorFilter implements ExceptionFilter{
    catch(exception: any, host: ArgumentsHost) {
        const response = host.switchToHttp().getResponse();

        let message :any= "Internal Server Error";
        let errors: any = null;
        let status = 500;

        if (exception instanceof ZodError) {
            message="input validation error";
            errors=exception.issues.map(e=>({field:e.path.toString(), desc:e.message}))
            status=400;
        }
        if(exception instanceof HttpException){
            const exceptionError:any = exception.getResponse()
            message=exception.message;
            errors= exceptionError.errors || null;
            status=exception.getStatus();
        }
        if (exception instanceof PrismaClientKnownRequestError) {
            const PRISMA_ERROR_CODES: Record<string, { message: string; status: number }> = {
                P2002: { message: 'Already exist.', status: 400 }, // Unique constraint failed
                P2003: { message: 'Invalid reference.', status: 400 }, // Foreign key constraint
                P2005: { message: 'Invalid data format.', status: 400 }, // Invalid field value
                P2011: { message: 'Required field cannot be null.', status: 400 }, // Null constraint
                P2025: { message: 'Record not found.', status: 404 }, // Record does not exist
              };
              message=exception.code;
            Object.keys(PRISMA_ERROR_CODES).forEach(key=>{
                if (key===exception.code) {
                    message=PRISMA_ERROR_CODES[key].message;
                    status=PRISMA_ERROR_CODES[key].status;
                }
            })
            errors=exception.meta;
        }
        if (!errors) {
            response.status(status).json({
                success:false,
                message,
                timestamp: new Date().toISOString()
            })
        }else{
            response.status(status).json({
                success:false,
                message,
                errors,
                timestamp: new Date().toISOString()
            })
        }
    }
}