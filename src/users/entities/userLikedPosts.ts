import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types} from 'mongoose';
import { User } from 'src/users/entities/user.entity';
import { Posts } from '../../posts/entities/post.entity';

export type UserLikedPostsDocument = UserLikedPosts & Document;

@Schema()
export class UserLikedPosts {
	@Prop({ type: [{type: Types.ObjectId, ref:'Posts'}] })
	postId: Posts[];

	@Prop({type: Types.ObjectId, ref: 'User'} )
	userId: string;

	@Prop({ required: true, default: Date.now() })
	createdAt: Date;

	@Prop({ required: false, default: Date.now() })
	updateAt: Date;
}

export const UserLikedPostsSchema = SchemaFactory.createForClass(UserLikedPosts);