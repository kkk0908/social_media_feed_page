import { CacheModule, Module, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Posts, PostSchema } from './entities/post.entity';
import { UtilService } from '../utils/utils.service';
import { Tags, TagsSchema } from './entities/tags.entity';
import { Images, ImagesSchema } from './entities/images.entity';

@Module({
  controllers: [PostsController],
  providers: [PostsService, UtilService],
  imports: [MongooseModule.forFeature([
    { name: Posts.name, schema: PostSchema },
    {name: Tags.name, schema: TagsSchema},
    {name: Images.name, schema: ImagesSchema}
  ]),
  CacheModule.register(),
  ]
})
export class PostsModule { }
