import { IsEmail, IsNotEmpty, IsString, MinLength, minLength } from "class-validator";

export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty()
	email: string;

    @IsNotEmpty()
    @MinLength(6)
	password: string;

    @IsNotEmpty()
    @MinLength(2)
	fullName: string;
}
