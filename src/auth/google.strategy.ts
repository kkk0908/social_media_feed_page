import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { config } from 'dotenv';

import { Injectable } from '@nestjs/common';

config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {

	constructor() {
		super({
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: 'http://localhost:3000/google/redirect',
			scope: ['email', 'profile'],
		});
	}
	async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
		const { name, emails, photos } = profile
		console.log(">>>>>>>.profile", profile)
		const user = {
			email: emails[0].value,
			fullName: name.givenName + ' ' + name.familyName,
			// firstName: name.givenName,
			// lastName: name.familyName,
			photo: photos[0].value,
			accessToken
		}
		done(null, user);
	}
}