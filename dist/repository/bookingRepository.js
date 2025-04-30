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
exports.BookingRepository = void 0;
class BookingRepository {
    constructor(bookingModel) {
        this.bookingModel = bookingModel;
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.bookingModel.create(data);
            }
            catch (err) {
                throw new Error(`Error creating booking: ${err.message}`);
            }
        });
    }
    findByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.bookingModel.find({ user: userId }).populate('package');
            }
            catch (err) {
                throw new Error(`Error finding bookings by user: ${err.message}`);
            }
        });
    }
    find() {
        return __awaiter(this, arguments, void 0, function* (query = {}) {
            try {
                return yield this.bookingModel.find(query).exec();
            }
            catch (err) {
                throw new Error(`Error finding bookings: ${err.message}`);
            }
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.bookingModel.find().populate('user').populate('package');
            }
            catch (err) {
                throw new Error(`Error finding all bookings: ${err.message}`);
            }
        });
    }
}
exports.BookingRepository = BookingRepository;
