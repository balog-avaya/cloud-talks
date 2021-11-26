import { IsInt, IsOptional, IsPositive, IsString } from "class-validator";

export class PostMaciDto {

@IsString()
@IsOptional()
readonly laci?: string;

@IsInt()
@IsPositive()
readonly buci: number;

}