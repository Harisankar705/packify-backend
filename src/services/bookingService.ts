import { IBooking, IBookingService } from "../interfaces/interfaces";
import { BookingRepository } from "../repository/bookingRepository";
import { Types } from 'mongoose';
export class BookingService implements IBookingService {
  private bookingRepository: BookingRepository;
  constructor(bookingRepository: BookingRepository) {
    this.bookingRepository = bookingRepository;
  }

  async create(booking: IBooking): Promise<IBooking> {
    return this.bookingRepository.create(booking);
  }

  async getByUser(userId: string | Types.ObjectId): Promise<IBooking[]> {
    const query = { user: typeof userId === 'string' ? new Types.ObjectId(userId) : userId };
    return await this.bookingRepository.find(query); 
 }

  async getAll(): Promise<IBooking[]> {
    return this.bookingRepository.findAll();
  }
}
