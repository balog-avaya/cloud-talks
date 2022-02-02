import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ description: 'Short task title' })
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({ description: 'Task description', required: false })
  @IsString()
  @IsOptional()
  readonly description?: string;
}
