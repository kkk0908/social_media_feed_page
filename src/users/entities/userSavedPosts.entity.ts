import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types} from 'mongoose';
import { Posts } from '../../posts/entities/post.entity';

export type UserSavedPostsDocument = UserSavedPosts & Document;

@Schema()
export class UserSavedPosts {
	@Prop({ type: [{type: Types.ObjectId, ref:'Posts'}] })
	postId: Posts[];

	@Prop({ type:{type: Types.ObjectId, ref: 'User'} })
	userId: string;

	@Prop({ required: true, default: Date.now() })
	createdAt: Date;

	@Prop({ required: false, default: Date.now() })
	updateAt: Date;
}

export const UserSavedPostsSchema = SchemaFactory.createForClass(UserSavedPosts);