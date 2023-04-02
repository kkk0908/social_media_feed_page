import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, UserSchema } from './entities/user.entity';
import { UtilService } from '../utils/utils.service';


@Module({
  controllers: [UsersController],
  providers: [UsersService, UtilService, JwtService],
  imports: [MongooseModule.forFeature([
    { name: User.name, schema: UserSchema },
    // { name: Token.name, schema: TokenSchema },
  ]),]
})
export class UsersModule { }
