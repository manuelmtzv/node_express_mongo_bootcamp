import mongoose, { Schema } from 'mongoose';
import type { ITourSimple } from '@/interfaces/tourSimple';

const TourSchema = new Schema<ITourSimple>({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
    trim: true,
  },
  duration: { type: Number, required: [true, 'A tour must have a duration'] },
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
  summary: { type: String, trim: true },
  description: { type: String, trim: true },
  imageCover: {
    type: String,
    required: [true, 'A tour must have a cover image'],
  },
  images: Array<string>,
  startDates: Array<Date>,
  createdAt: { type: Date, default: Date.now(), select: false },
});

const Tour = mongoose.model<ITourSimple>('Tour', TourSchema);

export default Tour;
