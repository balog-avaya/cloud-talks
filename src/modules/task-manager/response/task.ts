import {ApiProperty} from "@nestjs/swagger";
import {Exclude, Expose} from "class-transformer";
import {TaskStatus} from "../enum/task-status.enum";
import {CreateTaskDto} from "../dto/create-task.dto";
import {v4 as uuidv4} from 'uuid';

@Exclude()
export class Task {

  @Expose()
  @ApiProperty({description: 'Task unique ID'})
  id: string;

  @Expose()
  @ApiProperty({description: 'Short task title'})
  title: string;

  @Expose()
  @ApiProperty({description: 'Task description', required: false})
  description?: string;

  @Expose()
  @ApiProperty({description: 'Task owner unique ID'})
  owner: string;

  @Expose()
  @ApiProperty({description: 'Current task status', enum: TaskStatus, enumName: "TaskStatus"})
  status: TaskStatus;

  public constructor(init?: Partial<Task>) {
    Object.assign(this, init);
  }

  static createTask(dto: CreateTaskDto, userid: string) {
    return new Task(
      {
        title: dto.title,
        description: dto.description,
        id: uuidv4(),
        owner: userid,
        status: TaskStatus.NOT_STARTED
      }
    );
  }

}
