import { Model, Types } from 'mongoose'; 
import { IBooking, IBookingRepository } from "../interfaces/interfaces"; 
export class BookingRepository implements IBookingRepository {
  private bookingModel: Model<IBooking>; 
  constructor(bookingModel: Model<IBooking>) {
    this.bookingModel = bookingModel;
  }

  async create(data: IBooking): Promise<IBooking> {
    try {
      return await this.bookingModel.create(data);
    } catch (err) {
      throw new Error(`Error creating booking: ${(err as Error).message}`);
    }
  }

  async findByUserId(userId: string | Types.ObjectId): Promise<IBooking[]> {
    try {
      return await this.bookingModel.find({ user: userId }).populate('package');
    } catch (err) {
      throw new Error(`Error finding bookings by user: ${(err as Error).message}`);
    }
  }

  async find(query: any = {}): Promise<IBooking[]> {
    try {
      return await this.bookingModel.find(query).exec()
    } catch (err) {
      throw new Error(`Error finding bookings: ${(err as Error).message}`);
    }
  }
  
  async findAll(): Promise<IBooking[]> {
    try {
      return await this.bookingModel.find().populate('user').populate('package');
    } catch (err) {
      throw new Error(`Error finding all bookings: ${(err as Error).message}`);
    }
  }
}
