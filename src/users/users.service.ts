import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './entities/user.entity';
import * as messages from '../constants/messages.json';
import { UtilService } from '../utils/utils.service';


@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly utilService: UtilService,
    private readonly jwtService: JwtService,
  ) { }

  async loginByGoogle(createUserDto: CreateUserDto): Promise<{ message: string, data: any }> {
    try {
      let user = await this.userModel.findOne({ email: createUserDto.email });

      if (!user) {
        user = await this.userModel.create(createUserDto);
      }

      const { email, fullName } = user;
      const token = this.jwtService.sign({ email, fullName });

      return { data: { token, email: createUserDto.email }, message: messages.SUCCESS.CREATE };
    } catch (error) {
      console.log(error);

      if (error.status !== 500) {
        return error;
      } else {
        throw new InternalServerErrorException(messages.FAILED.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async findAllUsers(): Promise<User[]> {
    try {
      return this.userModel.find().exec();
    } catch (error) {
      if (error.status !== 500) {
        return error;
      } else {
        throw new InternalServerErrorException(messages.FAILED.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async findOneUser(id: string): Promise<User> {
    try {
      if (!await this.utilService.checkValidMongoDBId(id)) {
        throw new NotFoundException(messages.FAILED.INVALID_ID);
      }

      const userObj = await this.userModel.findById(id).exec();

      if (!userObj) {
        throw new NotFoundException(messages.FAILED.NOT_FOUND);
      }

      return userObj;
    } catch (error) {
      if (error.status !== 500) {
        return error;
      } else {
        throw new InternalServerErrorException(messages.FAILED.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async findOneUserByEmail(email: string): Promise<User> {
    try {
      const userObj = await this.userModel.findOne({ email }).exec();

      if (!userObj) {
        return null;
      }

      return userObj;
    } catch (error) {
      return null;
    }
  }
}
