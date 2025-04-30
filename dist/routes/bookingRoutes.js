"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookingRepository_1 = require("../repository/bookingRepository");
const protect_1 = __importDefault(require("../middleware/protect"));
const bookingController_1 = require("../controller/bookingController");
const bookingService_1 = require("../services/bookingService");
const booking_1 = require("../models/booking");
const bookingRouter = express_1.default.Router();
const bookingRepository = new bookingRepository_1.BookingRepository(booking_1.bookingModel);
const bookingService = new bookingService_1.BookingService(bookingRepository);
const bookingController = new bookingController_1.BookingController(bookingService);
bookingRouter.post('/', (0, protect_1.default)(['user', 'admin']), bookingController.createBooking.bind(bookingController));
bookingRouter.get('/my', (0, protect_1.default)(['user', 'admin']), bookingController.getUserBookings.bind(bookingController));
bookingRouter.get('/', (0, protect_1.default)(['admin']), bookingController.getAllBookings.bind(bookingController));
exports.default = bookingRouter;
