
import { IsString, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreatePostDto {
	@IsString()
	@IsNotEmpty()
	@MinLength(2)
	title: string;

	@IsString()
	@IsNotEmpty()
	contents: string;
}


