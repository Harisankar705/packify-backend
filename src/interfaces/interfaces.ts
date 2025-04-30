import { Request, Response } from 'express';
import { Types } from 'mongoose';
import { ITravelPackage } from '../models/package';
export interface IUser extends Document {
  _id?:string;
  name: string;
  email: string;
  password: string;
  googleId?:string;
  profilePic?: string;
  address?: string;
  role: 'user' | 'admin';
}
export interface IUserRepository {
  findByEmail(email: string): Promise<IUser | null>;
  createUser(data: Partial<IUser>): Promise<IUser>;
  findById(id: string | Types.ObjectId): Promise<IUser | null>;
  find(): Promise<IUser[]>;
  updateUser(id: string | Types.ObjectId, data: Partial<IUser>): Promise<IUser | null>;
}

export interface IAuthService {
  register(data: Partial<IUser>): Promise<IUser>;
  login(email: string, password: string): Promise<{ user: IUser; token: string }>;
  authenticateGoogleUser(token: string): Promise<{ user:IUser,accessToken: string}>
}

export interface IAuthController {
  register(req: Request, res: Response): Promise<void>;
  login(req: Request, res: Response): Promise<void>;
}
export interface IPackageService {
  create(data: any): Promise<any>;
  getAll(): Promise<any[]>;
  getById(id: string): Promise<any | null>;
  update(id: string, data: any): Promise<any | null>;
  remove(id: string): Promise<any | null>;
}

export interface IPackageController {
  createPackage(req: Request, res: Response): Promise<void>;
  getAllPackages(req: Request, res: Response): Promise<void>;
  getPackageById(req: Request, res: Response): Promise<void>;
  updatePackage(req: Request, res: Response): Promise<void>;
  deletePackage(req: Request, res: Response): Promise<void>;
}

export interface IBooking {
  _id?: Types.ObjectId;
  user: Types.ObjectId; 
  package: Types.ObjectId; 
  bookingDate: Date;
  status: 'pending' | 'confirmed' | 'cancelled';
  services: {
    food: boolean;
    accommodation: boolean;
  };
}
export interface IBookingController {
  createBooking(req: Request, res: Response): Promise<void>;
  getUserBookings(req: Request, res: Response): Promise<void>;
  getAllBookings(req: Request, res: Response): Promise<void>;
}

export interface IUserService {
  getAllUser(): Promise<IUser[]>;
  getById(id: string): Promise<IUser | null>;
  update(id: string, data: Partial<IUser>): Promise<IUser | null>;
}

export interface IBookingRepository {
  create(data: IBooking): Promise<IBooking>;
  findByUserId(userId: string): Promise<IBooking[]>;
  findAll(): Promise<IBooking[]>;
}
export interface IPackageRepository {
  create(data: ITravelPackage): Promise<ITravelPackage>;
  findAll(): Promise<ITravelPackage[]>;
  findById(id: string | Types.ObjectId): Promise<ITravelPackage | null>;
  update(id: string | Types.ObjectId, data: Partial<ITravelPackage>): Promise<ITravelPackage | null>;
  remove(id: string | Types.ObjectId): Promise<ITravelPackage | null>;
}

export interface IBookingService {
  create(booking: IBooking): Promise<IBooking>;
  getByUser(userId: string): Promise<IBooking[]>;
  getAll(): Promise<IBooking[]>;
}

export interface IPackageService {
  create(data: ITravelPackage): Promise<ITravelPackage>;
  getAll(): Promise<ITravelPackage[]>;
  getById(id: string): Promise<ITravelPackage | null>;
  update(id: string, data: Partial<ITravelPackage>): Promise<ITravelPackage | null>;
  remove(id: string): Promise<ITravelPackage | null>;
}

export interface IUserService {
  getById(id: string): Promise<IUser | null>;
  update(id: string, data: Partial<IUser>): Promise<IUser | null>;
}

export interface IBookingDTO {
  user: string; 
  package: string;
  services: {
    food: boolean;
    accommodation: boolean;
  };
}



export interface IUserController {
  getProfile(req: Request, res: Response): Promise<void>;
  updateProfile(req: Request, res: Response): Promise<void>;
}
export type AuthenticatedRequest = Request & {
  user?: {
    id: string;
    role: string;
  };
};
