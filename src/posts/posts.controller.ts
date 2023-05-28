import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, UseInterceptors, ClassSerializerInterceptor, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { QueryPostDto } from './dto/query-post.dto';
import { ActivityPostDto } from './dto/activity-post.dto';



@Controller('posts')
@UseInterceptors(ClassSerializerInterceptor)
@UsePipes(new ValidationPipe())
@ApiTags('posts')
@ApiBearerAuth()
export class PostsController {
  constructor(private readonly postsService: PostsService) { }


  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ClassSerializerInterceptor)
  createPost(@Body() createPostDto: CreatePostDto, @Request() req) {
    return this.postsService.createPost(createPostDto, req.user?._id);
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  findAllPosts(@Query() query: QueryPostDto) {
    return this.postsService.findAllPosts(query);
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  findOne(@Param('id') id: string) {
    return this.postsService.findOnePost(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ClassSerializerInterceptor)
  updatePost(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.updatePost(id, updatePostDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ClassSerializerInterceptor)
  remove(@Param('id') id: string) {
    return this.postsService.deletePost(id);
  }

  @Get('/tag/:id')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ClassSerializerInterceptor)
  findPostsByTag(@Param('id') id: string, @Query() query: QueryPostDto ) {
    return this.postsService.findPostsByTag(id, query);
  }

  @Get('/activities/:id')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ClassSerializerInterceptor)
  activityOnPost(@Param('id') id: string, @Query() query: ActivityPostDto,  @Request() req ) {
    return this.postsService.postActivities(id, query, req.user._id);
  }
}


