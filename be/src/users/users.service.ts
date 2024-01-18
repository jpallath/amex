import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { generateUser } from './users.helpers';
import { firstValueFrom, lastValueFrom } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly httpService: HttpService,
  ) {}

  async createNewUser() {
    const res = await lastValueFrom(
      this.httpService.get('https://randomuser.me/api/'),
    );
    const jsonData = res.data.results[0];
    const user = generateUser(jsonData);
    return this.userModel.create(user);
  }

  async getAllUsers(page: number = 0, limit: number = 10) {
    const skip = (page - 1) * limit;
    const users = await this.userModel.find().skip(skip).limit(limit).exec();
    const totalCount = await this.userModel.countDocuments();
    return {
      users,
      pages: Math.ceil(totalCount / 10),
      currentPage: page,
    };
  }

  async getUser(id: string) {
    const user = await this.userModel.find({ _id: id }).exec();
    return user;
  }
}
