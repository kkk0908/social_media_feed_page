import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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

}

export const UserSchema = SchemaFactory.createForClass(User);