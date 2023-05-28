import {IsNotEmpty, IsString } from "class-validator";

export class UserSavedPostDto {
	@IsString()
	@IsNotEmpty()
	userId: string;

	@IsString()
	@IsNotEmpty()
	postId: string;
}