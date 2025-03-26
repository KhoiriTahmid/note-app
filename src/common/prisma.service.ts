import { Inject, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

export class PrismaService extends PrismaClient<Prisma.PrismaClientOptions, string> implements OnModuleInit{

    constructor(@Inject(WINSTON_MODULE_PROVIDER) private logger:Logger){
        super()
    }
    onModuleInit() {
        this.$on('info',(e)=>{
            this.logger.info(e)
        })
        this.$on('warn',(e)=>{
            this.logger.warn(e)
        })
        this.$on('error',(e)=>{
            this.logger.error(e)
        })
    }
}
