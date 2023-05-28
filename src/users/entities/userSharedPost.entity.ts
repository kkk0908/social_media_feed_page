import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types} from 'mongoose';
import { Posts } from '../../posts/entities/post.entity';

export type UsersharedPostsDocument = UserSharedPosts & Document;

@Schema()
export class UserSharedPosts {
	@Prop({ type: [{type: Types.ObjectId, ref:'Posts'}] })
	postId: Posts[];

	@Prop({type: Types.ObjectId, ref: 'User'})
	userId: string;

	@Prop({ required: true, default: Date.now() })
	createdAt: Date;

	@Prop({ required: false, default: Date.now() })
	updateAt: Date;
}

export const UserSharedPostsSchema = SchemaFactory.createForClass(UserSharedPosts);