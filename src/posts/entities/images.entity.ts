
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ImagesDocument = Images & Document;

@Schema()
export class Images {
	@Prop({ required: true, unique: true, index: true })
	file: string;

	@Prop({ required: false , default: Date.now()})
	createdBy: string;

	@Prop({ required: true, default: Date.now() })
	createdAt: Date;
}

export const ImagesSchema = SchemaFactory.createForClass(Images);