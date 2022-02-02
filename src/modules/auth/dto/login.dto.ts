import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ description: 'Username' })
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty({ description: 'Password' })
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
