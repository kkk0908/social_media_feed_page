import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TagsDocument = Tags & Document;

@Schema()
export class Tags {
	@Prop({ required: true, unique: true, index: true })
	name: string;

	@Prop({ required: false , default: Date.now()})
	createdBy: string;

	@Prop({ required: true, default: Date.now() })
	createdAt: Date;
}

export const TagsSchema = SchemaFactory.createForClass(Tags);