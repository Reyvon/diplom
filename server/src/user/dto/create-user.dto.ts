import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, MinLength } from "class-validator";

export class CreateUserDto {
   
    @IsEmail()
    @ApiProperty()
    email: string;

   
    @MinLength(6, {message: 'warning'})
    @ApiProperty()
    password: string;
}
