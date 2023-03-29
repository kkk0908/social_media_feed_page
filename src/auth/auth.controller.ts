import { Controller, Body, Post, UseGuards, Request, HttpCode, Get, Delete, } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from '../users/users.service';
import { Logger } from 'src/utils/logger/logger.service';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';


enum EndPoint {
  LOGIN = 'login',
  SIGN_UP = 'signup',
  LOG_OUT = 'logout'
}

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(private authService: AuthService) { }

  @Post('login')
  @UseGuards(AuthGuard('local'))
  @HttpCode(200)
  async login(@Body() user: LoginDto, @Request() req) {
    const route = EndPoint.LOGIN;
    console.log(user, req)
    this.logger.verbose({ endPoint: route, request: user, message: 'Calling login api controller' });

    let loginInfo = await this.authService.login(user);

    this.logger.verbose({
      endPoint: route,
      response: loginInfo,
      message: 'login api controller response',
    });
    return loginInfo
  }

  @Post('signup')
  @HttpCode(200)
  async signUp(@Body() user: CreateUserDto,) {
    const route = EndPoint.SIGN_UP;
    this.logger.verbose({ endPoint: route, request: user, message: 'Calling signup api controller' });
    console.log(">>>>>>> hello >>>>>>>")
    let result = await this.authService.signup(user);

    this.logger.verbose({
      endPoint: route,
      response: result,
      message: 'signup api controller response',
    });
    return result
  }

  // 	@Delete('logOut')
  // 	@UseGuards(AuthGuard('jwt'))
  // 	async logOut(@Request() req) {
  // 		const route = EndPoint.LOG_OUT;
  // 		this.logger.verbose({ endPoint: route, request: req.user, message: 'Calling logout api controller' });
  // 		let result = await this.authService.logout(req);

  // 		this.logger.verbose({
  // 			endPoint: route,
  // 			response: result,
  // 			message: 'logout api controller response',
  // 		});
  // 		return result
  // 	}
}