import {ApiProperty} from "@nestjs/swagger";
import {IsIn, IsOptional, IsString} from "class-validator";
import {Expose} from "class-transformer";
import {TaskStatus} from "../enum/task-status.enum";

export class UpdateTaskDto {

  @ApiProperty({description: 'Short task title', required: false})
  @IsString()
  @IsOptional()
  readonly title: string;

  @ApiProperty({description: 'Task description', required: false})
  @IsString()
  @IsOptional()
  readonly description: string;

  @Expose()
  @ApiProperty({description: 'Task status', enum: TaskStatus, enumName: "TaskStatus", required: false})
  @IsOptional()
  @IsIn([TaskStatus.NOT_STARTED, TaskStatus.IN_PROGRESS, TaskStatus.COMPLETED])
  readonly status: TaskStatus;
}
