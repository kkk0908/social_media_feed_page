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

    @Prop({ required: false })
	password: string;

// isAuth0 specify, whether user is created by through sign up by AUTH0 or normal sign up
// isAuth0 = false  for normal sign up
// isAuth0 = true   for sign up through Auth0
    @Prop({ required: false , default:true })
	isAuth0: boolean;

	@Prop({ required: true, default: Date.now() })
	createdAt: Date;

	@Prop({ required: false })
	updateAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);