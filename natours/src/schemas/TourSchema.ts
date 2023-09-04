import mongoose, { Schema } from 'mongoose';
import type { ITour } from '@/interfaces/tour';

const TourSchema = new Schema<ITour>({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
  },
  rating: { type: Number, default: 4.5 },
  price: { type: Number, required: [true, 'A tour must have price'] },
});

const Tour = mongoose.model<ITour>('Tour', TourSchema);

const testTour = new Tour({
  name: 'The Park Camper',
  rating: 4.7,
  price: 997,
});

console.log(testTour);

export default Tour;
