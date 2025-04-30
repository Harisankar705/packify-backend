import mongoose, { Schema, Document, Model } from 'mongoose';
import { IUser } from '../interfaces/interfaces';

const userSchema: Schema<IUser> = new Schema<IUser>({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePic: { type: String },
  googleId:{type:String},
  address: { type: String },
  role: { type: String, enum: ['user', 'admin'], default: 'user' }
});

export const UserModel: Model<IUser> = mongoose.model<IUser>('User', userSchema);
