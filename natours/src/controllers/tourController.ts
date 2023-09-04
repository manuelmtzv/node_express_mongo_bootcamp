import fs from 'fs';
import { type Request, type Response } from 'express';
import { StatusTypes } from '../enums/statusTypes';

import { tours } from '@/data/tours';

const tourController = {
  getTours(_: Request, res: Response) {
    res.send({
      status: StatusTypes.success,
      count: tours.length,
      data: {
        tours,
      },
    });
  },

  getTourById(req: Request, res: Response) {
    const tour = tours.find((tour) => tour.id === +req.params.id);

    if (tour === undefined) {
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
  },

  createTour(req: Request, res: Response) {
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ id: newId }, req.body);

    tours.push(newTour);

    fs.writeFile(
      `@root/dev-data/data/tours-simple.json`,
      JSON.stringify(tours),
      (err) => {
        if (err != null)
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
      },
    );
  },

  updateTour(req: Request, res: Response) {
    const tour = tours.find((tour) => tour.id === +req.params.id);

    if (tour === undefined) {
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
  },

  deleteTour(req: Request, res: Response) {
    const tour = tours.find((tour) => tour.id === +req.params.id);

    if (tour === undefined) {
      return res.status(404).send({
        status: StatusTypes.failed,
        message: 'Not found',
      });
    }

    res.status(204).send(null);
  },
  validateCreateTour(req: Request, res: Response, next: () => void) {
    const { name, price } = req.body;

    if (name !== undefined || price !== undefined) {
      return res.status(400).send({
        status: StatusTypes.failed,
        message: 'Missing name or price',
      });
    }

    next();
  },
};

export default tourController;
