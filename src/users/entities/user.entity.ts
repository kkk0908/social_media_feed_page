import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Posts } from 'src/posts/entities/post.entity';

export type UserDocument = User & Document;

@Schema()
export class User {
	@Prop({ required: true, unique: true })
	email: string;

	@Prop({ required: true })
	fullName: string;

	@Prop({ required: false })
	photo: string;

	@Prop({ required: true, default: Date.now() })
	createdAt: Date;

	@Prop({ required: false })
	updateAt: Date;

    @Prop({type:[{ type: Types.ObjectId, ref: 'Posts' }] })
	savedPosts: Posts[];

    @Prop({type:[{ type: Types.ObjectId, ref: 'Posts' }] })
	likedPosts: Posts[];

	@Prop({type:[{ type: Types.ObjectId, ref: 'Posts' }] })
	dislikedPosts: Posts[];


}

export const UserSchema = SchemaFactory.createForClass(User);