import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UtilService } from '../utils/utils.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Posts, PostDocument } from './entities/post.entity';
import * as messages from '../constants/messages.json'
import { QueryPostDto } from './dto/query-post.dto';
import { Tags, TagsDocument } from './entities/tags.entity';
import { Images, ImagesDocument } from './entities/images.entity';
import { ActivityPostDto } from './dto/activity-post.dto';
import { UserLikedPosts, UserLikedPostsDocument } from 'src/users/entities/userLikedPosts';
import { UserSavedPosts, UserSavedPostsDocument } from 'src/users/entities/userSavedPosts.entity';
import { UserSharedPosts } from 'src/users/entities/userSharedPost.entity';


@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Posts.name) private readonly postModel: Model<PostDocument>,
    @InjectModel(Tags.name) private readonly tagsModel: Model<TagsDocument>,
    @InjectModel(Images.name) private readonly imagesModel: Model<ImagesDocument>,
    @InjectModel(UserLikedPosts.name) private readonly userLikedPostModel: Model<UserLikedPostsDocument>,
    @InjectModel(UserSavedPosts.name) private readonly userSavedPostModel: Model<UserSavedPostsDocument>,
     @InjectModel(UserSharedPosts.name) private readonly userSharedPostModel: Model<UserSavedPostsDocument>,
    private readonly utilService: UtilService) { }

  async createPost(createPostDto: CreatePostDto, createdBy: string): Promise<{ message: string , result?:any}> {
    try {
      let isExistedTitle = await this.postModel.findOne({ title: createPostDto.title })
      if (isExistedTitle) throw new BadRequestException(`${createPostDto.title} Title is already used!`)
      let images =  createPostDto.images.map(img=>{return {file:img}})
      let insertedImages = await this.imagesModel.insertMany(images)
       const insertedImgId = insertedImages.map(img=>img._id)
      let tagLists = [];
       let tagsId = []
      for(let tag of createPostDto.tags) {
       let IsTagExist = await this.tagsModel.findOne({name:tag});
       if(!IsTagExist){
        tagLists.push({name:tag})
        } else {
        tagsId.push(IsTagExist._id)
      }
      }

      let savedTags = await this.tagsModel.insertMany(tagLists);
      let tagsIdList = savedTags.map(tag=>tag._id)

      let result: any = await new this.postModel({
        ...createPostDto,
        images: insertedImgId,
        tags:[...tagsId,...tagsIdList],
        createdBy: createdBy,
        createdAt: new Date(),
        updatedAt: new Date(),
      }).save();

      return { message: messages.SUCCESS.CREATE }
    } catch (error) {
      if (error.error !== 500) {
        return error._message
      } else {
        throw new InternalServerErrorException(messages.FAILED.INTERNAL_SERVER_ERROR)
      }
    }
  }

  async findAllPosts(query: QueryPostDto): Promise<Posts[]> {
    try {
      let result = await this.postModel.find().populate([ "tags", "createdBy", "images"]).limit(query.limit).skip(query.skip).lean()
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
      let postObj = await this.postModel.findById(id).lean().populate(["tags", "createdBy", "images"]);
      if (postObj) return JSON.parse(JSON.stringify(postObj))
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

  async findPostsByTag(id: string, query: QueryPostDto): Promise<Posts> {
    try {
      if (!await this.utilService.checkValidMongoDBId(id)) throw new NotFoundException(messages.FAILED.INVALID_ID)
      let postObj = await this.postModel.find({tags: {$in:[id]}}).limit(query.limit).skip(query.skip).lean().populate(["tags"]);
      console.log("postObj", postObj)
      if (postObj) return JSON.parse(JSON.stringify(postObj))
      throw new NotFoundException(messages.FAILED.NOT_FOUND)
    } catch (error) {
      if (error.error !== 500) {
        return error
      } else {
        throw new InternalServerErrorException(messages.FAILED.INTERNAL_SERVER_ERROR)
      }
    }
  }

  async postActivities(id: string, query: ActivityPostDto, userId:string): Promise<{message:string}> {
    try {
      if (!await this.utilService.checkValidMongoDBId(id)) throw new NotFoundException(messages.FAILED.INVALID_ID)
      let existedPosts = await this.postModel.findOne({_id:id});
      if(!existedPosts) throw new BadRequestException(messages.FAILED.NOT_FOUND);

      if(query.Type=="like") {
       let isUserLikedThePost = await this.userLikedPostModel.findOne({userId :userId})
       if(!isUserLikedThePost){
        await this.userLikedPostModel.create({postId:id, userId :userId})
        await this.postModel.updateOne({_id:id}, {likesCount:existedPosts.likesCount+1})
      }else{
       let likedIdByUser:any = isUserLikedThePost.postId
       if(!likedIdByUser.includes(id)){
        await this.userLikedPostModel.updateOne({userId :userId}, {postId:[...likedIdByUser, id]})
         await this.postModel.updateOne({_id:id}, {likesCount:existedPosts.likesCount+1})
      }
      }
     }
    else if(query.Type=="save"){
       let isUserSavedThePost = await this.userSavedPostModel.findOne({userId :userId})
       if(!isUserSavedThePost){
        await this.userSavedPostModel.create({postId:id, userId :userId})
        await this.postModel.updateOne({_id:id}, {saveCount:existedPosts.saveCount+1})
      } else{
           let savedIdByUser:any = isUserSavedThePost.postId
            if(!savedIdByUser.includes(id)){
                await this.userLikedPostModel.updateOne({userId :userId}, {postId:[...savedIdByUser, id]})
                await this.postModel.updateOne({_id:id}, {saveCount:existedPosts.saveCount+1})
           }
      }
    }
   else{
      let isUserSharedThePost = await this.userSharedPostModel.findOne({userId :userId})
       if(!isUserSharedThePost){
        await this.userSharedPostModel.create({postId:id, userId :userId})
        await this.postModel.updateOne({_id:id}, {shareCount:existedPosts.shareCount+1})
      } else{
           let savedIdByUser:any = isUserSharedThePost.postId
            if(!savedIdByUser.includes(id)){
                await this.userSharedPostModel.updateOne({userId :userId}, {postId:[...savedIdByUser, id]})
                await this.postModel.updateOne({_id:id}, {shareCount:existedPosts.shareCount+1})
           }
      }
   }

      return  {message: messages.SUCCESS.UPDATE}
    } catch (error) {
      if (error.error !== 500) {
        return error
      } else {
        throw new InternalServerErrorException(messages.FAILED.INTERNAL_SERVER_ERROR)
      }
    }
  }
}
