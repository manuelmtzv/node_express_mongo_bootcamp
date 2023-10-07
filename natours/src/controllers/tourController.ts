import { type Request, type Response } from 'express';
import { StatusTypes } from '../enums/statusTypes';
import Tour from '@/models/tourModel';

const tourController = {
  async getTours(_: Request, res: Response) {
    try {
      const tours = await Tour.find();

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
};

export default tourController;
