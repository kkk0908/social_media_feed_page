import { Controller, UseGuards, Get, Req, } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { Logger } from 'src/utils/logger/logger.service';
import { AuthService } from './auth.service';


@Controller('login')
@ApiTags('login')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(private authService: AuthService) { }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) { }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req) {
    return await this.authService.googleLogin(req?.user)
  }

}


