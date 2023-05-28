import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export enum ActivityEnum {
  Value1 = 'like',
  Value2 = 'share',
  Value3 = 'save',
}

export class ActivityPostDto {
	@IsEnum(ActivityEnum)
	@IsString()
	Type: ActivityEnum
}

