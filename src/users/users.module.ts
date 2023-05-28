import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, UserSchema } from './entities/user.entity';
import { UtilService } from '../utils/utils.service';


@Module({
  controllers: [UsersController],
  providers: [UsersService, UtilService, JwtService],
  imports: [MongooseModule.forFeature([
    { name: User.name, schema: UserSchema }
  ]),
   JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: process.env.TOKEN_EXPIRATION },
    }),
]
})
export class UsersModule { }
