import { IsNotEmpty, MinLength } from "class-validator";

export class CreateTagDto {

@IsNotEmpty()
@MinLength(2)
tagName:string
}