import { Types } from 'mongoose';
import { IUser, IUserRepository } from '../interfaces/interfaces';
import { UserModel } from '../models/user';

export class UserRepository implements IUserRepository {
  private userModel: typeof UserModel;

  constructor(userModel: typeof UserModel = UserModel) {
    this.userModel = userModel;
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return await this.userModel.findOne({ email }).exec();
  }
  async find(): Promise<IUser[]> {
    return await this.userModel.find().exec();
  }
 
  

  async createUser(data: Partial<IUser>): Promise<IUser> {
    return await this.userModel.create(data);
  }

  async findById(id: string | Types.ObjectId): Promise<IUser | null> {
    return await this.userModel.findById(id).exec();
  }

  async updateUser(id: string | Types.ObjectId, data: Partial<IUser>): Promise<IUser | null> {
    return await this.userModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }
}
