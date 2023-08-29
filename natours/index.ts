import fs from 'fs';
import app from './src/app';
import dotenv from 'dotenv';
dotenv.config();

import { StatusTypes } from './src/enums/statusTypes';
import { Tour } from './src/interfaces/tour';

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8')
) as Tour[];

app.get('/api/v1/tours', (_, res) => {
  res.send({
    status: StatusTypes.success,
    count: tours.length,
    data: {
      tours,
    },
  });
});

app.get('/api/v1/tours/:id', (req, res) => {
  const tour = tours.find((tour) => tour.id === +req.params.id);

  if (!tour) {
    return res.status(404).send({
      status: StatusTypes.failed,
      message: 'Not found',
    });
  }

  res.send({
    status: StatusTypes.success,
    data: {
      tour,
    },
  });
});

app.post('/api/v1/tours', async (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  await fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err)
        return res.status(500).send({
          status: StatusTypes.failed,
          message: err?.message,
        });

      res.status(201).send({
        status: StatusTypes.success,
        data: {
          tour: newTour,
        },
      });
    }
  );
});

app.patch('/api/v1/tours/:id', (req, res) => {
  const tour = tours.find((tour) => tour.id === +req.params.id);

  if (!tour) {
    return res.status(404).send({
      status: StatusTypes.failed,
      message: 'Not found',
    });
  }

  res.status(200).send({
    status: StatusTypes.success,
    data: {
      tour,
    },
  });
});

app.get('*', (req, res) => {
  res.status(404).send('Not found');
});

app.listen(process.env.APP_PORT ?? 4000, () => {
  console.log(
    `Server is running in http://localhost:${process.env.APP_PORT ?? 3000}`
  );
});
