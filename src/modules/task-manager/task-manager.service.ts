import {Injectable, NotFoundException} from '@nestjs/common';
import {Task} from "./response/task";
import {CreateTaskDto} from "./dto/create-task.dto";
import {UpdateTaskDto} from "./dto/update-task.dto";

@Injectable()
export class TaskManagerService {

  tasklist: Task[] = [];

  private getUserTaskList(userid: string) {
    return this.tasklist.filter(value => value.owner === userid);
  }

  private getTaskIndexOrFail(userid: string, taskId: string) {
    const taskIdx = this.tasklist.findIndex(t => t.owner === userid && t.id === taskId);

    if (taskIdx === -1) {
      throw new NotFoundException('Task ID not found');
    }
    return taskIdx;
  }

  async createTask(userid: string, dto: CreateTaskDto): Promise<Task> {
    const task = Task.createTask(dto, userid);

    this.tasklist.push(task);
    return task;
  }

  async updateTask(userid: string, taskId: string, dto: UpdateTaskDto): Promise<Task[]> {
    const taskIdx = this.getTaskIndexOrFail(userid, taskId);

    const task = {...this.tasklist[taskIdx], ...dto};

    this.tasklist[taskIdx] = task;
    return this.getUserTaskList(userid);
  }


  async deleteTask(userid: string, taskId: string): Promise<Task[]> {
    const taskIdx = this.getTaskIndexOrFail(userid, taskId);

    this.tasklist.splice(taskIdx, 1);

    return this.getUserTaskList(userid);
  }

  async getTasks(userid: string): Promise<Task[]> {
    return this.getUserTaskList(userid);
  }


}
