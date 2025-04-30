"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingController = void 0;
class BookingController {
    constructor(bookingService) {
        this.bookingService = bookingService;
    }
    createBooking(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                console.log("USERID", userId);
                console.log('Package Create Request:', req.body);
                const { package: packageId, services } = req.body;
                if (!userId || !packageId || !services) {
                    console.log;
                    res.status(400).json({ message: 'Missing required fields: user, package, or services' });
                    return;
                }
                if (typeof services.food !== 'boolean' ||
                    typeof services.accommodation !== 'boolean') {
                    res.status(400).json({ message: 'Services must include valid food and accommodation flags' });
                    return;
                }
                const bookingData = {
                    user: userId,
                    package: packageId,
                    bookingDate: new Date(),
                    status: 'pending',
                    services,
                };
                const booking = yield this.bookingService.create(bookingData);
                res.status(201).json(booking);
            }
            catch (err) {
                console.error('Error creating booking:', err);
                res.status(400).json({ message: err.message || 'Booking creation failed' });
            }
        });
    }
    getUserBookings(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!userId) {
                    res.status(400).json({ message: 'User not found or not authenticated' });
                    return;
                }
                console.log("GET USER BOOKINGS");
                const bookings = yield this.bookingService.getByUser(userId);
                if (bookings.length === 0) {
                    res.status(404).json({ message: 'No bookings found for this user' });
                    return;
                }
                res.json(bookings);
            }
            catch (err) {
                console.error('Error fetching user bookings:', err);
                res.status(500).json({ message: err.message || 'Internal Server Error' });
            }
        });
    }
    getAllBookings(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bookings = yield this.bookingService.getAll();
                console.log(bookings);
                console.log("GET ALL BOOKINGS");
                if (bookings.length === 0) {
                    res.status(404).json({ message: 'No bookings found' });
                    return;
                }
                res.json(bookings);
            }
            catch (err) {
                console.error('Error fetching all bookings:', err);
                res.status(500).json({ message: err.message || 'Internal Server Error' });
            }
        });
    }
}
exports.BookingController = BookingController;
