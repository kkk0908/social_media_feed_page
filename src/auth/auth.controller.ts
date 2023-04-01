import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('login')
@ApiTags('Login')
export class AuthController {
  constructor(private authService: AuthService) { }

  // Route to initiate Google OAuth flow
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) { }

  // Route that handles Google OAuth callback and returns a JWT token
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req) {
    return await this.authService.googleLogin(req?.user);
  }
}
