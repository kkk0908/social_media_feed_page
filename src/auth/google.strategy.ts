import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { GoogleUserDto } from './dto/google-user.dto';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
	constructor(private readonly configService: ConfigService) {
		super({
			clientID: configService.get('GOOGLE_CLIENT_ID'),
			clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
			callbackURL: configService.get('CALLBACK_URL'),
			scope: ['email', 'profile'],
		});
	}

	async validate(
		accessToken: string,
		refreshToken: string,
		profile: any,
		done: VerifyCallback,
	): Promise<void> {
		const { name, emails, photos } = profile;

		const googleUserDto = new GoogleUserDto();
		googleUserDto.email = emails[0].value;
		googleUserDto.fullName = name.givenName + ' ' + name.familyName;
		googleUserDto.photo = photos[0].value;
		googleUserDto.accessToken = accessToken;

		done(null, googleUserDto);
	}
}
