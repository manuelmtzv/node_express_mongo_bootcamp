import mongoose, { Schema } from 'mongoose';
import type { ITour } from '@/interfaces/tour';

const TourSchema = new Schema<ITour>({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
    trim: true,
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have a group size'],
  },
  difficulty: {
    type: String,
    required: [true, 'A tour must have a difficulty'],
  },
  ratingsAverage: { type: Number, default: 4.5 },
  ratingsQuantity: { type: Number, default: 0 },
  price: { type: Number, required: [true, 'A tour must have price'] },
  discount: { type: Number },
  summary: { type: String, trim: true },
  description: { type: String, trim: true },
  imageCover: {
    type: String,
    required: [true, 'A tour must have a cover image'],
  },
  images: Array<string>,
  createdAt: { type: Date, default: Date.now() },
  startDates: Array<Date>,
});

const Tour = mongoose.model<ITour>('Tour', TourSchema);

export default Tour;
