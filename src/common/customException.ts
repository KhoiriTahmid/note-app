import { HttpException } from "@nestjs/common";

export class CustomException extends HttpException{
    constructor(code:number, message:string, errors:any=null){
        if (errors) {
            super({
                success:false,
                message,
                errors,
                timestamp: new Date().toISOString()
            },code)
        }else{
            super({
                success:false,
                message,
                timestamp: new Date().toISOString()
            },code)
        }
    }
}