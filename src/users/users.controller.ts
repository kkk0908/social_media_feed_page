import { Controller,Post, Body,UseGuards, UseInterceptors, ClassSerializerInterceptor , Request} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CreatePostDto } from 'src/posts/dto/create-post.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Controller('user')
@ApiTags('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('signup')
  signUp(@Body() createUserDto: CreateUserDto, @Request() req) {
    return this.usersService.signUp(createUserDto);
  }

  @Post('login')
  @UseGuards(AuthGuard('local'))
  login(@Body() cred: LoginDto, @Request() req) {
    return this.usersService.login(cred);
  }

}
