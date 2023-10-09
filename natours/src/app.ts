import type { Request, Response } from 'express';
import { EnvTypes } from '@/enums/envTypes';
import path from 'path';
import express from 'express';
import morgan from 'morgan';
import tourRouter from '@/routes/tour.routes';
import userRouter from '@/routes/user.routes';
import setComparisonOperators from './middlewares/setComparisonOperators';

const app = express();

if (process.env.NODE_ENV === EnvTypes.DEVELOPMENT) app.use(morgan('dev'));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Custom middlewares
app.use(setComparisonOperators);

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.get('*', (req: Request, res: Response) => {
  res.status(404).send('Not found');
});

export default app;
