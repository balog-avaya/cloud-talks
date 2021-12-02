import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsPositive, IsString } from "class-validator";

export class PostMaciDto {

@IsString()
@IsOptional()
@ApiProperty({description: 'Laci property vagyok', required: false})
readonly laci?: string;

@IsInt()
@IsPositive()
@ApiProperty({description: 'Buci vagyok, egy number'})
readonly buci: number;

}