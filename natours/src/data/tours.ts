import fs from 'fs';
import { type ITour } from '@/interfaces/tour';

export const tours = JSON.parse(
  fs.readFileSync(`./dev-data/data/tours-simple.json`, 'utf-8'),
) as ITour[];

console.log('Tours imported successfully');
