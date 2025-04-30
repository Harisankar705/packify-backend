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
exports.BookingService = void 0;
const mongoose_1 = require("mongoose");
class BookingService {
    constructor(bookingRepository) {
        this.bookingRepository = bookingRepository;
    }
    create(booking) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.bookingRepository.create(booking);
        });
    }
    getByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = { user: typeof userId === 'string' ? new mongoose_1.Types.ObjectId(userId) : userId };
            return yield this.bookingRepository.find(query);
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.bookingRepository.findAll();
        });
    }
}
exports.BookingService = BookingService;
