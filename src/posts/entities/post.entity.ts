import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Tags } from './tags.entity';
import { Images } from './images.entity';
import { User } from '../../users/entities/user.entity';

export type PostDocument = Posts & Document;

@Schema()
export class Posts {
	@Prop({ required: true, unique: true, index: true }) // applied indexing on email field
	title: string;

	@Prop({ required: true })
	contents: string;

    @Prop({ type: [{type:Types.ObjectId, ref: "Images"}] })
	images: Images[];

	@Prop({ type:[{type:Types.ObjectId, ref:"User"}] })
	createdBy: User[];

	@Prop({ required: true })
	createdAt: Date;

	@Prop({ required: false })
	updateAt: Date;

    @Prop({ required: false , default:0})
	likesCount: number;

    @Prop({ required: false , default:0})
	shareCount: number;

    @Prop({ required: false , default:0})
	saveCount: number;

    @Prop({ required: false , default:0})
	downloadCount: number;

    @Prop({ type:[{ type: Types.ObjectId, ref: 'Tags' }] })
	tags: Tags[];

    @Prop({default:false})
    isArchive : boolean


}

export const PostSchema = SchemaFactory.createForClass(Posts);