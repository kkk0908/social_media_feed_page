import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthGuard } from '@nestjs/passport';


@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }


  @Post()
  @UseGuards(AuthGuard('jwt'))
  createPost(@Body() createPostDto: CreatePostDto, @Request() req) {
    return this.postsService.createPost(createPostDto, req.user?.email);
  }



  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAllPosts() {
    return this.postsService.findAllPosts();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOnePost(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
  //   return this.postsService.update(+id, updatePostDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.postsService.remove(+id);
  // }
}
