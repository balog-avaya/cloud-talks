import {Body, Controller, Delete, Get, Post, Patch, UseGuards, Request, Param} from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiTags} from "@nestjs/swagger";
import {CreateTaskDto} from "./dto/create-task.dto";
import {UpdateTaskDto} from "./dto/update-task.dto";
import {Task} from "./response/task";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {TaskManagerService} from "./task-manager.service";

@Controller('task-manager')
@ApiTags('task-manager')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class TaskManagerController {

  constructor(readonly taskmgrsvc: TaskManagerService) {
  }

  @ApiOperation({
    operationId: 'get-tasks',
    summary: 'List tasks',
    description: 'Lists all tasks of a given user'
  })
  @Get('tasks')
  async getTasks(@Request() req): Promise<Task[]> {
    console.log('REQ', req.user);
    return this.taskmgrsvc.getTasks(req?.user?.id);
  }

  @ApiOperation({
    operationId: 'create-task',
    summary: 'Create a new task',
    description: 'Creates a new task with a given title and description and assigns it to the user'
  })
  @Post('create-task')
  async createTask(@Request() req, @Body() dto: CreateTaskDto): Promise<Task> {
    return this.taskmgrsvc.createTask(req?.user?.id, dto);
  }

  @ApiOperation({
    operationId: 'update-task',
    summary: 'Updates an existing task',
    description: 'Updates an existing task by ID'
  })
  @Patch('task/:id')
  async updateTask(@Request() req, @Param('id') taskId: string, @Body() dto: UpdateTaskDto): Promise<Task[]> {
    return this.taskmgrsvc.updateTask(req?.user?.id, taskId, dto);
  }

  @ApiOperation({
    operationId: 'delete-task',
    summary: 'Deletes an existing task',
    description: 'Deletes an existing task by ID'
  })
  @Delete('task/:id')
  async deleteTask(@Request() req, @Param('id') id: string): Promise<Task[]> {
    return [];
  }

}


