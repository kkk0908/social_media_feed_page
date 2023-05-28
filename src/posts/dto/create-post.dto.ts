
import { IsString, IsNotEmpty, MinLength, IsArray } from 'class-validator';
export class CreatePostDto {
	@IsString()
	@IsNotEmpty()
	@MinLength(2)
	title: string;

	@IsString()
	@IsNotEmpty()
	contents: string;

    @IsArray()
	images: string[];

    @IsArray()
	tags: string[];
}


