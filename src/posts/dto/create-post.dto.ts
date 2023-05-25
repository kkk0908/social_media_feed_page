
import { IsString, IsNotEmpty, MinLength, IsArray, minLength, maxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreatePostDto {
	@IsString()
	@IsNotEmpty()
	@MinLength(2)
	title: string;

	@IsString()
	@IsNotEmpty()
	contents: string;

    @IsString()
	image: string;

    @IsArray()
    @IsString()
	tags: String[];
}


