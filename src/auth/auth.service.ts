import { Injectable, } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
  ) { }

  async googleLogin(req) { // Async function to handle Google login
    return await this.userService.loginByGoogle(req) // Call loginByGoogle method of UsersService to log in using Google
  }

}