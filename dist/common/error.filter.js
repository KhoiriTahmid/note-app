"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorFilter = void 0;
const common_1 = require("@nestjs/common");
const library_1 = require("@prisma/client/runtime/library");
const zod_1 = require("zod");
let ErrorFilter = class ErrorFilter {
    catch(exception, host) {
        const response = host.switchToHttp().getResponse();
        let message = "Internal Server Error";
        let errors = null;
        let status = 500;
        if (exception instanceof zod_1.ZodError) {
            message = "input validation error";
            errors = exception.issues.map(e => ({ field: e.path.toString(), desc: e.message }));
            status = 400;
        }
        if (exception instanceof common_1.HttpException) {
            const exceptionError = exception.getResponse();
            message = exception.message;
            errors = exceptionError.errors || null;
            status = exception.getStatus();
        }
        if (exception instanceof library_1.PrismaClientKnownRequestError) {
            const PRISMA_ERROR_CODES = {
                P2002: { message: 'Already exist.', status: 400 },
                P2003: { message: 'Invalid reference.', status: 400 },
                P2005: { message: 'Invalid data format.', status: 400 },
                P2011: { message: 'Required field cannot be null.', status: 400 },
                P2025: { message: 'Record not found.', status: 404 },
            };
            message = exception.code;
            Object.keys(PRISMA_ERROR_CODES).forEach(key => {
                if (key === exception.code) {
                    message = PRISMA_ERROR_CODES[key].message;
                    status = PRISMA_ERROR_CODES[key].status;
                }
            });
            errors = exception.meta;
        }
        if (!errors) {
            response.status(status).json({
                success: false,
                message,
                timestamp: new Date().toISOString()
            });
        }
        else {
            response.status(status).json({
                success: false,
                message,
                errors,
                timestamp: new Date().toISOString()
            });
        }
    }
};
exports.ErrorFilter = ErrorFilter;
exports.ErrorFilter = ErrorFilter = __decorate([
    (0, common_1.Catch)(common_1.HttpException, zod_1.ZodError, library_1.PrismaClientKnownRequestError)
], ErrorFilter);
//# sourceMappingURL=error.filter.js.map