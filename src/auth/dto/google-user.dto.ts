
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class GoogleUserDto {
	@IsString()
	@IsNotEmpty()
	@IsEmail()
	email: string;

	@IsString()
	@IsNotEmpty()
	fullName: string;

	@IsString()
	photo: string;

	@IsString()
	accessToken: string;
}





