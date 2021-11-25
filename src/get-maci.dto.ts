import { IsEmail, IsOptional, IsString, Length } from "class-validator";


export class GetMaciDto {

    @IsString()
    @Length(5)
    firstName: string;

    @IsEmail()
    lastName: string;


    @IsString()
    @IsOptional()
    middleName: string;
}