import type { IModel } from '@/interfaces/model';
import type { Document } from 'mongoose';

export interface ITourSimple extends Document, IModel {
  id: string;
  name: string;
  duration: number;
  maxGroupSize: number;
  difficulty: string;
  ratingsAverage: number;
  ratingsQuantity: number;
  price: number;
  summary: string;
  description: string;
  imageCover: string;
  images: string[];
  startDates: Date[];
}
