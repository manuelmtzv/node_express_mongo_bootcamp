import { StatusTypes } from '../enums/statusTypes';
import Tour from '@/models/tourModel';
import ApiFeatures from '@/utils/apiFeatures';

import type { NextFunction, Request, Response } from 'express';
import type { ITourSimple } from '@/interfaces/tourSimple';

function aliasTopTours(req: Request, res: Response, next: NextFunction): void {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,difficulty';
  next();
}

const tourController = {
  async getTours(req: Request, res: Response) {
    try {
      const features = new ApiFeatures<ITourSimple>(
        Tour.find(),
        req.query,
      ).execute();

      const tours = await features.query;

      res.status(200).send({
        status: StatusTypes.success,
        results: tours.length,
        data: {
          tours,
        },
      });
    } catch (err: any) {
      res.status(404).send({
        status: StatusTypes.failed,
        message: err.message,
      });
    }
  },

  async getTourById(req: Request, res: Response) {
    try {
      const tour = await Tour.findById(req.params.id);

      res.status(200).send({ status: StatusTypes.success, data: { tour } });
    } catch (err: any) {
      res.status(404).send({
        status: StatusTypes.failed,
        message: err.message,
      });
    }
  },

  async createTour(req: Request, res: Response): Promise<void> {
    try {
      const newTour = await Tour.create(req.body);

      res.status(201).send({
        status: StatusTypes.success,
        data: {
          tour: newTour,
        },
      });
    } catch (err: any) {
      res.status(400).send({
        status: StatusTypes.failed,
        message: err.message,
      });
    }
  },

  async updateTour(req: Request, res: Response) {
    try {
      const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });

      res.status(200).send({
        status: StatusTypes.success,
        data: {
          tour,
        },
      });
    } catch (err: any) {
      res.status(404).send({
        status: StatusTypes.failed,
        message: err.message,
      });
    }
  },

  async deleteTour(req: Request, res: Response) {
    try {
      await Tour.findByIdAndDelete(req.params.id);
    } catch (err: any) {
      res.status(404).send({
        status: StatusTypes.failed,
        message: err.message,
      });
    }

    res.status(204).send(null);
  },

  async getTourStats(req: Request, res: Response) {
    try {
      const stats = await Tour.aggregate([
        {
          $match: { ratingsAverage: { $gte: 4.5 } },
        },
        {
          $group: {
            _id: '$ratingsAverage',
            numTours: { $sum: 1 },
            numRatings: { $sum: '$ratingsQuantity' },
            avgRating: { $avg: '$ratingsAverage' },
            avgPrice: { $avg: '$price' },
            minPrice: { $min: '$price' },
            maxPrice: { $max: '$price' },
          },
        },
        {
          $sort: { avgPrice: 1 },
        },
        // {
        //   $match: { _id: { $ne: 4.5 } },
        // }
      ]);

      res.status(200).send({
        status: StatusTypes.success,
        data: {
          stats,
        },
      });
    } catch (err: any) {
      res.status(404).send({
        status: StatusTypes.failed,
        message: err.message,
      });
    }
  },

  async getMonthlyPlan(req: Request, res: Response) {
    try {
      const year = Number(req.params.year);

      console.log(year);

      const plan = await Tour.aggregate([
        {
          $unwind: '$startDates',
        },
        {
          $match: {
            startDates: {
              $gte: new Date(`${year}-01-01`),
              $lte: new Date(`${year}-12-31`),
            },
          },
        },
      ]);

      res.status(200).send({
        status: StatusTypes.success,
        data: {
          plan,
        },
      });
    } catch (err: any) {
      res.status(404).send({
        status: StatusTypes.failed,
        message: err.message,
      });
    }
  },
};

export default {
  ...tourController,
  aliasTopTours,
};
