import {IsNotEmpty, IsString } from "class-validator";

export class UserLikedPostDto {
	@IsString()
	@IsNotEmpty()
	userId: string;

	@IsString()
	@IsNotEmpty()
	postId: string;
}