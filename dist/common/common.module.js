"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonModule = void 0;
const common_1 = require("@nestjs/common");
const nest_winston_1 = require("nest-winston");
const winston = require("winston");
require("winston-daily-rotate-file");
const path = require("path");
const prisma_service_1 = require("./prisma.service");
const validation_service_1 = require("./validation.service");
const core_1 = require("@nestjs/core");
const error_filter_1 = require("./error.filter");
const logger_interseceptor_1 = require("./logger.interseceptor");
const account_module_1 = require("../account/account.module");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const authn_guard_1 = require("./authn.guard");
const authz_guard_1 = require("./authz.guard");
const logDir = path.resolve(__dirname, '../../logs');
let CommonModule = class CommonModule {
};
exports.CommonModule = CommonModule;
exports.CommonModule = CommonModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        controllers: [],
        providers: [
            prisma_service_1.PrismaService,
            validation_service_1.ValidationService,
            logger_interseceptor_1.LoggerInterceptor,
            {
                provide: core_1.APP_FILTER,
                useClass: error_filter_1.ErrorFilter
            },
            jwt_1.JwtService,
            authz_guard_1.AuthzGuard,
            authn_guard_1.AuthnGuard
        ],
        exports: [prisma_service_1.PrismaService, validation_service_1.ValidationService, logger_interseceptor_1.LoggerInterceptor, jwt_1.JwtService, authn_guard_1.AuthnGuard, authz_guard_1.AuthzGuard],
        imports: [
            account_module_1.AccountModule,
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    secret: configService.get('ACCESS_TOKEN_KEY'),
                    signOptions: { expiresIn: '1d' },
                }),
            }),
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            nest_winston_1.WinstonModule.forRoot({
                format: winston.format.combine(winston.format.timestamp({ format: 'YYYY-MM-DD hh:mm:ss.SSS A' }), winston.format.printf(({ timestamp, level, message }) => {
                    return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
                })),
                transports: [
                    new winston.transports.DailyRotateFile({
                        dirname: logDir,
                        filename: "error-%DATE%.log",
                        level: 'error',
                        datePattern: "DD-MM-YYYY",
                        maxFiles: "7d"
                    }),
                    new winston.transports.DailyRotateFile({
                        dirname: logDir,
                        filename: "warn-%DATE%.log",
                        level: 'warn',
                        datePattern: "DD-MM-YYYY",
                        maxFiles: "7d"
                    }),
                    new winston.transports.DailyRotateFile({
                        dirname: logDir,
                        filename: "info-%DATE%.log",
                        level: 'info',
                        datePattern: "DD-MM-YYYY",
                        maxFiles: "7d"
                    }),
                    new winston.transports.Console({
                        format: winston.format.combine(winston.format.timestamp({ format: 'YYYY-MM-DD hh:mm:ss.SSS A' }), winston.format.printf(({ timestamp, level, message }) => {
                            return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
                        })),
                    })
                ]
            })
        ]
    })
], CommonModule);
//# sourceMappingURL=common.module.js.map