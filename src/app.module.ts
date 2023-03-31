import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [MongooseModule.forRoot(process.env.DB_URL), AuthModule, UsersModule, PostsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
