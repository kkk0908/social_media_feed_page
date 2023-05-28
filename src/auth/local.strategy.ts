import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {
		super({
			usernameField: "email"
		});
	}

	async validate(username: string, password: string): Promise<any> {
		const user = await this.userService.findOneUserByEmail(username);

		if (!user) {
			throw new UnauthorizedException('Invalid user credentials');
		}
		return user;
	}
}