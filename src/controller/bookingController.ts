import { Request, Response } from 'express';
import { AuthenticatedRequest, IBookingController } from '../interfaces/interfaces';
import { BookingService } from '../services/bookingService';
import { IBooking } from '../interfaces/interfaces';
export class BookingController implements IBookingController {
  private bookingService: BookingService;
  constructor(bookingService: BookingService) {
    this.bookingService = bookingService;
  }

  async createBooking(req: Request, res: Response): Promise<void> {
  try {
    const userId = (req as any).user?.id; 
    console.log("USERID",userId)
    console.log('Package Create Request:', req.body);

    const { package: packageId, services } = req.body;

    if (!userId || !packageId || !services) {
      console.log
      res.status(400).json({ message: 'Missing required fields: user, package, or services' });
      return;
    }

    if (
      typeof services.food !== 'boolean' ||
      typeof services.accommodation !== 'boolean'
    ) {
      res.status(400).json({ message: 'Services must include valid food and accommodation flags' });
      return;
    }

    const bookingData: IBooking = {
      user: userId,
      package: packageId,
      bookingDate: new Date(),
      status: 'pending', 
      services,
    };

    const booking = await this.bookingService.create(bookingData);

    res.status(201).json(booking);
  } catch (err: any) {
    console.error('Error creating booking:', err);
    res.status(400).json({ message: err.message || 'Booking creation failed' });
  }
}

  
  

  async getUserBookings(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(400).json({ message: 'User not found or not authenticated' });
        return;

      }
      console.log("GET USER BOOKINGS")
      const bookings = await this.bookingService.getByUser(userId);
      if (bookings.length === 0) {
        res.status(404).json({ message: 'No bookings found for this user' });
        return;
      }
      res.json(bookings);
    } catch (err: any) {
      console.error('Error fetching user bookings:', err);
      res.status(500).json({ message: err.message || 'Internal Server Error' });
    }
  }

  async getAllBookings(req: Request, res: Response): Promise<void> {
    try {
      const bookings = await this.bookingService.getAll();
      console.log(bookings)
      console.log("GET ALL BOOKINGS")
      if (bookings.length === 0) {
        res.status(404).json({ message: 'No bookings found' });
        return;
      }
      res.json(bookings);
    } catch (err: any) {
      console.error('Error fetching all bookings:', err);
      res.status(500).json({ message: err.message || 'Internal Server Error' });
    }
  }
}
