import mongoose, { Schema, Document, model } from 'mongoose';

export interface ITravelPackage extends Document {
  from: string;
  to: string;
  startDate: Date;
  endDate: Date;
  basePrice: number;
  services: {
    food: boolean;
    accommodation: boolean;
  };
}

const packageSchema = new Schema<ITravelPackage>({
  from: { type: String, required: true },
  to: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  basePrice: { type: Number, required: true },
  services: {
    food: { type: Boolean, required: true },
    accommodation: { type: Boolean, required: true }
  }
});
  export const packageModel=mongoose.model("Package",packageSchema)