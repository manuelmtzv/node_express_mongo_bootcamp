import type { IModel } from '@/interfaces/model';

export interface ITour extends IModel {
  startLocation: StartLocation;
  ratingsAverage: number;
  ratingsQuantity: number;
  images: string[];
  startDates: Date[];
  id: string;
  name: string;
  duration: number;
  maxGroupSize: number;
  difficulty: string;
  guides: string[];
  price: number;
  summary: string;
  description: string;
  imageCover: string;
  locations: Location[];
  discount?: number;
}

export interface Location {
  id: string;
  description: string;
  type: Type;
  coordinates: number[];
  day: number;
}

export enum Type {
  Point = 'Point',
}

export interface StartLocation {
  description: string;
  type: Type;
  coordinates: number[];
  address: string;
}
