import { Module } from '@nestjs/common';
import { TaskManagerService } from './task-manager.service';
import { TaskManagerController } from './task-manager.controller';
import { RedisLockModule, RedisLockService } from "@huangang/nestjs-simple-redis-lock";

@Module({
  imports: [],
  providers: [TaskManagerService],
  controllers: [TaskManagerController],
})
export class TaskManagerModule {}
