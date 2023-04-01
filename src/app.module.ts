import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [MongooseModule.forRoot(process.env.DB_URL), ConfigModule.forRoot(), AuthModule, UsersModule, PostsModule
  ],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule { }
