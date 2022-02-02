import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { TaskStatus } from '../enum/task-status.enum';
import { CreateTaskDto } from '../dto/create-task.dto';

@Exclude()
export class Task {
  @Expose()
  @ApiProperty({ description: 'Task unique ID' })
  id: string;

  @Expose()
  @ApiProperty({ description: 'Short task title' })
  title: string;

  @Expose()
  @ApiProperty({ description: 'Task description', required: false })
  description?: string;

  @Expose()
  @ApiProperty({ description: 'Task owner unique ID' })
  owner: string;

  @Expose()
  @ApiProperty({
    description: 'Current task status',
    enum: TaskStatus,
    enumName: 'TaskStatus',
  })
  status: TaskStatus;

  public constructor(init?: Partial<Task>) {
    Object.assign(this, init);
  }

  static createTask(id: string, dto: CreateTaskDto, userid: string) {
    return new Task({
      title: dto.title,
      description: dto.description,
      id,
      owner: userid,
      status: TaskStatus.NOT_STARTED,
    });
  }
}
