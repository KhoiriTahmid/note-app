import { Module } from '@nestjs/common';
import { RepeatedTaskService } from './repeated-task.service';
import { RepeatedTaskController } from './repeated-task.controller';

@Module({
  providers: [RepeatedTaskService],
  controllers: [RepeatedTaskController]
})
export class RepeatedTaskModule {}
