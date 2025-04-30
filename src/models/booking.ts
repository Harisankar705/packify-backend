import mongoose, { Schema, Types } from 'mongoose';
import { IBooking } from '../interfaces/interfaces';
const bookingSchema = new Schema<IBooking>({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    package: { type: Schema.Types.ObjectId, ref: 'Package', required: true },
    bookingDate: { type: Date, default: Date.now },
    status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
    services: {
      food: { type: Boolean, default: false },
      accommodation: { type: Boolean, default: false },
    },
});
export const bookingModel=mongoose.model("Booking",bookingSchema)