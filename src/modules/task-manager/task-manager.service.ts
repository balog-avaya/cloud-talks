import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Task } from './response/task';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { RedisService } from '@liaoliaots/nestjs-redis';
import IORedis = require('ioredis');
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TaskManagerService {
  constructor(protected readonly redisService: RedisService) {}

  private getClient(): IORedis.Redis {
    return this.redisService.getClient();
  }

  private async getUserTaskList(userid: string): Promise<Task[]> {
    const client = this.getClient();
    const sresult = await client.scan(0, 'match', `${userid}:*`);
    if (!sresult || sresult.length < 2) {
      throw new InternalServerErrorException('Error getting user task list');
    }
    const result = await client.mget(sresult[1]);
    return result.map((v) => JSON.parse(v));
  }

  getKey(userId: string, taskId: string): string {
    return `${userId}:${taskId}`;
  }

  async createTask(userid: string, dto: CreateTaskDto): Promise<Task> {
    const id = uuidv4();
    const task = Task.createTask(id, dto, userid);
    const client = this.getClient();
    const data = JSON.stringify(task);
    const key = this.getKey(userid, id);

    const result = await client.set(key, data);
    if (result != 'OK') {
      throw new InternalServerErrorException('Error when adding new task');
    }
    return task;
  }

  async updateTask(
    userid: string,
    taskId: string,
    dto: UpdateTaskDto,
  ): Promise<Task[]> {
    const client = this.getClient();
    const key = this.getKey(userid, taskId);
    const result = await client.get(key);

    if (!result) {
      throw new NotFoundException('Task was not found');
    }

    const updated = { ...JSON.parse(result), ...dto };
    await client.set(key, JSON.stringify(updated));

    return this.getUserTaskList(userid);
  }

  async deleteTask(userid: string, taskId: string): Promise<Task[]> {
    const client = this.getClient();
    const key = this.getKey(userid, taskId);
    const result = await client.del(key);

    if (result == 0) {
      throw new NotFoundException('Task was not found');
    }

    return this.getUserTaskList(userid);
  }

  async getTasks(userid: string): Promise<Task[]> {
    return this.getUserTaskList(userid);
  }
}
