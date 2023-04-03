import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UtilService } from '../utils/utils.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Posts, PostDocument } from './entities/post.entity';
import * as messages from '../constants/messages.json'
import { QueryPostDto } from './dto/query-post.dto';


@Injectable()
export class PostsService {
  constructor(@InjectModel(Posts.name) private readonly postModel: Model<PostDocument>,
    private readonly utilService: UtilService) { }

  async createPost(createPostDto: CreatePostDto, createdBy: string): Promise<{ message: string }> {
    try {
      let isExistedTitle = await this.postModel.findOne({ title: createPostDto.title })
      if (isExistedTitle) throw new BadRequestException(`${createPostDto.title} Title is already used!`)
      let result: any = await new this.postModel({
        ...createPostDto,
        createdBy: createdBy,
        createdAt: new Date(),
        updatedAt: new Date(),
      }).save();
      return { message: messages.SUCCESS.CREATE }
    } catch (error) {
      if (error.error !== 500) {
        return error
      } else {
        throw new InternalServerErrorException(messages.FAILED.INTERNAL_SERVER_ERROR)
      }
    }
  }

  async findAllPosts(query: QueryPostDto): Promise<Posts[]> {
    try {
      let result = await this.postModel.find().limit(query.limit).skip(query.skip).lean().select(['_id', "title", 'contents'])
      result = JSON.parse(JSON.stringify(result))
      return result
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException(messages.FAILED.INTERNAL_SERVER_ERROR)
    }
  }

  async findOnePost(id: string): Promise<Posts> {
    try {
      if (!await this.utilService.checkValidMongoDBId(id)) throw new NotFoundException(messages.FAILED.INVALID_ID)
      let postObj = await this.postModel.findById(id).lean();
      if (postObj) return postObj
      throw new NotFoundException(messages.FAILED.NOT_FOUND)
    } catch (error) {
      if (error.error !== 500) {
        return error
      } else {
        throw new InternalServerErrorException(messages.FAILED.INTERNAL_SERVER_ERROR)
      }
    }
  }

  async deletePost(id: string): Promise<{ message: string }> {
    try {
      if (!await this.utilService.checkValidMongoDBId(id)) throw new NotFoundException(messages.FAILED.INVALID_ID)
      let postObj = await this.postModel.findOne({ _id: id });
      if (!postObj) throw new NotFoundException(messages.FAILED.NOT_FOUND)
      let deletedPost = await this.postModel.deleteOne({ _id: id });
      if (deletedPost?.deletedCount > 0) return { message: messages.SUCCESS.DELETE }
      throw new InternalServerErrorException(messages.FAILED.INTERNAL_SERVER_ERROR)
    } catch (error) {
      if (error.error !== 500) {
        return error
      } else {
        throw new InternalServerErrorException(messages.FAILED.INTERNAL_SERVER_ERROR)
      }
    }
  }

  async updatePost(id: string, updatePostDto: UpdatePostDto): Promise<{ data: any, message: string }> {
    try {
      if (!await this.utilService.checkValidMongoDBId(id)) throw new NotFoundException(messages.FAILED.INVALID_ID)
      let existedPost = await this.postModel.findOne({ _id: id });
      if (!existedPost) throw new NotFoundException(messages.FAILED.NOT_FOUND)
      let updatedPost = await this.postModel.updateOne({ _id: id }, updatePostDto, { new: true });
      return { data: updatedPost, message: messages.SUCCESS.UPDATE }

    } catch (error) {
      if (error.error !== 500) {
        return error
      } else {
        throw new InternalServerErrorException(messages.FAILED.INTERNAL_SERVER_ERROR)
      }
    }
  }
}
