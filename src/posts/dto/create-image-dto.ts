import { IsBase64, IsNotEmpty, MinLength } from "class-validator";

export class CreateTagDto {
@IsNotEmpty()
@IsBase64()
file:string
}