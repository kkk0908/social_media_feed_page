import { Injectable, } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Logger } from 'src/utils/logger/logger.service';
import { UsersService } from 'src/users/users.service';
import { UtilService } from 'src/utils/utils.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly userService: UsersService,
    private readonly utilService: UtilService,
  ) { }


  async signup(userDetails: CreateUserDto) {
    return this.userService.signUp(userDetails)
  }

  async login(loginDetails: LoginDto) {
    return this.userService.login(loginDetails)
  }

  async validateUser(username: string, pass: string) {
    // find if user exist with this email
    const user = await this.userService.findOneUserByEmail(username);
    if (!user) {
      return null;
    }

    // find if user password match
    const match = await this.utilService.comparePassword(pass, user.password);
    if (!match) {
      return null;
    }

    // tslint:disable-next-line: no-string-literal
    const { password, ...result } = user
    return result;
  }

}