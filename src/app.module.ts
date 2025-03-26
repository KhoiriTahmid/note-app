import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { AccountModule } from './account/account.module';
import { NoteModule } from './note/note.module';
import { RepeatedTaskModule } from './repeated-task/repeated-task.module';
import { TaskModule } from './task/task.module';
import { EndlessTaskModule } from './endless_task/endless_task.module';

@Module({
  imports: [CommonModule, AccountModule, NoteModule, RepeatedTaskModule, TaskModule, EndlessTaskModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
