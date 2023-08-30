import fs from 'fs';
import app from './src/app';
import dotenv from 'dotenv';
dotenv.config();

import { StatusTypes } from './src/enums/statusTypes';
import { Tour } from './src/interfaces/tour';
import { Request, Response } from 'express';

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8')
) as Tour[];

function getTours(_: Request, res: Response) {
  res.send({
    status: StatusTypes.success,
    count: tours.length,
    data: {
      tours,
    },
  });
}

function getTourById(req: Request, res: Response) {
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
}

function postTour(req: Request, res: Response) {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
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
}

function updateTour(req: Request, res: Response) {
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
}

function deleteTour(req: Request, res: Response) {
  const tour = tours.find((tour) => tour.id === +req.params.id);

  if (!tour) {
    return res.status(404).send({
      status: StatusTypes.failed,
      message: 'Not found',
    });
  }

  res.status(204).send(null);
}

app.route('/api/v1/tours').get(getTours).post(postTour);

app
  .route('/api/v1/tours/:id')
  .get(getTourById)
  .patch(updateTour)
  .delete(deleteTour);

app.get('*', (req, res) => {
  res.status(404).send('Not found');
});

app.listen(process.env.APP_PORT ?? 4000, () => {
  console.log(
    `Server is running in http://localhost:${process.env.APP_PORT ?? 3000}`
  );
});
