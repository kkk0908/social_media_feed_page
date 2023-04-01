import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PostDocument = Posts & Document;

@Schema()
export class Posts {
	@Prop({ required: true, unique: true, index: true }) // applied indexing on email field
	title: string;

	@Prop({ required: true })
	contents: string;

	@Prop({ required: false })
	createdBy: string;

	@Prop({ required: true })
	createdAt: Date;

	@Prop({ required: false })
	updateAt: Date;

}

export const PostSchema = SchemaFactory.createForClass(Posts);