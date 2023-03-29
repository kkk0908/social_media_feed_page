import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';
import * as messages from '../constants/messages.json';
import { UtilService } from 'src/utils/utils.service';


@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly utilService: UtilService,
    private readonly jwtService: JwtService,
  ) { }
  async signUp(createUserDto: CreateUserDto): Promise<{ message: string, data: User }> {
    try {
      let existedUser = await this.userModel.findOne({ email: createUserDto.email })
      if (existedUser) throw new BadRequestException("Email Already Existed!")

      createUserDto.password = await this.utilService.hashPassword(createUserDto.password);

      let result: any = await new this.userModel({
        ...createUserDto,
        createdAt: new Date(),
      }).save();
      const { password, ...passRemovedResult } = result._doc
      return { data: passRemovedResult, message: messages.SUCCESS.CREATE }

    } catch (error) {
      if (error.error !== 500) {
        return error
      } else {
        throw new InternalServerErrorException(messages.FAILED.INTERNAL_SERVER_ERROR)
      }
    }
  }

  async login(createUserDto: CreateUserDto): Promise<{ message: string, data: any }> {
    try {
      let existedUser = await this.userModel.findOne({ email: createUserDto.email })
      if (!existedUser) throw new BadRequestException("User Not Found!")

      if (!bcrypt.compareSync(createUserDto.password, existedUser.password)) throw new BadRequestException("Incorrect Password!")

      let token = this.jwtService.sign({ email: existedUser.email })

      return { data: { token, email: createUserDto.email }, message: messages.SUCCESS.CREATE }

    } catch (error) {
      console.log(error)
      if (error.error !== 500) {
        return error
      } else {
        throw new InternalServerErrorException(messages.FAILED.INTERNAL_SERVER_ERROR)
      }
    }
  }

  async findAllUsers(): Promise<User[]> {
    try {
      return this.userModel.find().exec();
    } catch (error) {
      if (error.error !== 500) {
        return error
      } else {
        throw new InternalServerErrorException(messages.FAILED.INTERNAL_SERVER_ERROR)
      }
    }
  }

  async findOneUser(id: string): Promise<User> {
    try {

      if (!await this.utilService.checkValidMongoDBId(id)) throw new NotFoundException(messages.FAILED.INVALID_ID)
      let userObj = await this.userModel.findById(id).exec();
      if (userObj) return userObj
      throw new NotFoundException(messages.FAILED.NOT_FOUND)
    } catch (error) {
      if (error.error !== 500) {
        return error
      } else {
        throw new InternalServerErrorException(messages.FAILED.INTERNAL_SERVER_ERROR)
      }
    }
  }
  async findOneUserByEmail(email: string) {
    try {
      let userObj = await this.userModel.findOne({ email }).exec();
      if (userObj) return userObj
      return false
    } catch (error) {
      return false
    }
  }




}
