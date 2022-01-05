import {Module} from '@nestjs/common';
import {TaskManagerService} from './task-manager.service';
import { TaskManagerController } from './task-manager.controller';

@Module({
  providers: [TaskManagerService],
  controllers: [TaskManagerController],
})
export class TaskManagerModule {}
