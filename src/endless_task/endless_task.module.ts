import { Module } from '@nestjs/common';
import { EndlessTaskService } from './endless_task.service';
import { EndlessTaskController } from './endless_task.controller';

@Module({
  providers: [EndlessTaskService],
  controllers: [EndlessTaskController]
})
export class EndlessTaskModule {}
