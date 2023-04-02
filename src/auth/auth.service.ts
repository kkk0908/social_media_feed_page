import { Injectable, } from '@nestjs/common';
import { UsersService } from '../users/users.service';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
  ) { }

  async googleLogin(req) { // Async function to handle Google login
    return await this.userService.loginByGoogle(req) // Call loginByGoogle method of UsersService to log in using Google
  }

}