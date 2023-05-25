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
	image: string;

	@Prop({ required: false })
	createdBy: string;

	@Prop({ required: true })
	createdAt: Date;

	@Prop({ required: false })
	updateAt: Date;

    @Prop({ required: false , default:0})
	likes: number;

    @Prop({ required: false , default:0})
	dislike: number;

    @Prop({ required: [String], length:3})
	tags: String[];

}

export const PostSchema = SchemaFactory.createForClass(Posts);