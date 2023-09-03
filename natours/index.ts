import fs from 'fs';
import app from './src/app';
import dotenv from 'dotenv';
dotenv.config();

import { Request, Response } from 'express';
import tourRouter from '@/routers/tour.router';
import type { Tour } from '@/interfaces/tour';

export const tours = JSON.parse(
  fs.readFileSync(`./dev-data/data/tours-simple.json`, 'utf-8')
) as Tour[];

app.use('/api/v1/tours', tourRouter);

app.get('*', (req: Request, res: Response) => {
  res.status(404).send('Not found');
});

app.listen(process.env.APP_PORT ?? 4000, () => {
  console.log(
    `Server is running in http://localhost:${process.env.APP_PORT ?? 3000}`
  );
});
