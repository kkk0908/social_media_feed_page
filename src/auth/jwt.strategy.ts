import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Request, ExecutionContext } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	jwtFromRequest: any;
	constructor(private readonly userService: UsersService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: process.env.JWT_SECRET_KEY,
		});
	}

	async validate(payload: any, context: ExecutionContext) {
		console.log("JWT payload", payload)
		const user = await this.userService.findOneUserByEmail(payload.email);
		if (user) return payload;
		throw new UnauthorizedException('You are not authorized to perform the operation');
	}


}