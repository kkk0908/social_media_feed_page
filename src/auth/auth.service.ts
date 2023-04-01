import { Injectable, } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Logger } from 'src/utils/logger/logger.service';
import { UsersService } from 'src/users/users.service';
import { UtilService } from 'src/utils/utils.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
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


  async googleLogin(req) {
    return await this.userService.loginByGoogle(req)
  }

}