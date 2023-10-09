import fs from 'fs';
import { type ITourSimple } from '@/interfaces/tourSimple';

export const tours = JSON.parse(
  fs.readFileSync(`./dev-data/data/tours-simple.json`, 'utf-8'),
) as ITourSimple[];

console.log('Tours imported successfully');
