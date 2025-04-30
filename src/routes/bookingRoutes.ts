import express, { Router } from 'express';
import { BookingRepository } from '../repository/bookingRepository';
import protect from '../middleware/protect';
import { BookingController } from '../controller/bookingController';
import { BookingService } from '../services/bookingService';
import { bookingModel } from '../models/booking';

const bookingRouter: Router = express.Router();

const bookingRepository = new BookingRepository(bookingModel);
const bookingService = new BookingService(bookingRepository);
const bookingController = new BookingController(bookingService);

bookingRouter.post('/', protect(['user', 'admin']), bookingController.createBooking.bind(bookingController));
bookingRouter.get('/my', protect(['user', 'admin']), bookingController.getUserBookings.bind(bookingController));
bookingRouter.get('/', protect(['admin']), bookingController.getAllBookings.bind(bookingController));

export default bookingRouter;
