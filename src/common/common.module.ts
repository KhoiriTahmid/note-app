import { Global, HttpStatus, Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import * as winston from "winston";
import  "winston-daily-rotate-file";
import * as path from 'path';
import { PrismaService } from './prisma.service';
import { ValidationService } from './validation.service';
import { APP_FILTER } from '@nestjs/core';
import { ErrorFilter } from './error.filter';
import { LoggerInterceptor } from './logger.interseceptor';
import { AccountModule } from 'src/account/account.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { providePrismaClientExceptionFilter } from 'nestjs-prisma';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthnGuard } from './authn.guard';
import { AuthzGuard } from './authz.guard';

const logDir = path.resolve(__dirname, '../../logs');

@Global()
@Module({
  controllers: [],
  providers: [ 
    PrismaService, 
    ValidationService,
    LoggerInterceptor,
    {
      provide:APP_FILTER,
      useClass:ErrorFilter
    },
    JwtService,
    AuthzGuard,
    AuthnGuard
  ],
  exports:[PrismaService, ValidationService,LoggerInterceptor, JwtService, AuthnGuard, AuthzGuard],
  imports:[
    AccountModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('ACCESS_TOKEN_KEY'),
        signOptions: { expiresIn: '1d' },
      }),
    }),
    ConfigModule.forRoot({
      isGlobal:true,
    }),
    WinstonModule.forRoot({
      format: winston.format.combine(
        winston.format.timestamp({format: 'YYYY-MM-DD hh:mm:ss.SSS A'}),
        winston.format.printf(({timestamp,level,message})=>{
          return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
        })),
      transports:[
        new winston.transports.DailyRotateFile({
          dirname:logDir,
          filename:"error-%DATE%.log",
          level:'error',
          datePattern:"DD-MM-YYYY",
          maxFiles:"7d"
        }),
        new winston.transports.DailyRotateFile({
          dirname:logDir,
          filename:"warn-%DATE%.log",
          level:'warn',
          datePattern:"DD-MM-YYYY",
          maxFiles:"7d"
        }),
        new winston.transports.DailyRotateFile({
          dirname:logDir,
          filename:"info-%DATE%.log",
          level:'info',
          datePattern:"DD-MM-YYYY",
          maxFiles:"7d"
        }),
        new winston.transports.Console({
          format:winston.format.combine(
            winston.format.timestamp({format: 'YYYY-MM-DD hh:mm:ss.SSS A'}),
            winston.format.printf(({timestamp,level,message})=>{
              return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
            })),
        })
      ]
    })
  ]
})
export class CommonModule {}
