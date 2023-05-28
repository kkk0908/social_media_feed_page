import { CacheModule, Module, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Posts, PostSchema } from './entities/post.entity';
import { UtilService } from '../utils/utils.service';
import { Tags, TagsSchema } from './entities/tags.entity';
import { Images, ImagesSchema } from './entities/images.entity';
import { User, UserSchema } from 'src/users/entities/user.entity';
import { UserLikedPosts, UserLikedPostsSchema } from 'src/users/entities/userLikedPosts';
import { UserSavedPosts, UserSavedPostsSchema } from 'src/users/entities/userSavedPosts.entity';
import { UserSharedPosts, UserSharedPostsSchema } from 'src/users/entities/userSharedPost.entity';

@Module({
  controllers: [PostsController],
  providers: [PostsService, UtilService],
  imports: [MongooseModule.forFeature([
    { name: Posts.name, schema: PostSchema },
    {name: Tags.name, schema: TagsSchema},
    {name: Images.name, schema: ImagesSchema},
    {name: User.name, schema: UserSchema},
    {name: UserLikedPosts.name, schema:UserLikedPostsSchema},
    {name:UserSavedPosts.name,schema:UserSavedPostsSchema},
    {name:UserSharedPosts.name, schema: UserSharedPostsSchema}
  ]),
  CacheModule.register(),
  ]
})
export class PostsModule { }
