import express from 'express';
import tourController from '@/controllers/tour.controller';

const { getTours, postTour, updateTour, getTourById, deleteTour } =
  tourController;

const tourRouter = express.Router();

tourRouter.route('/').get(getTours).post(postTour);

tourRouter.route('/:id').get(getTourById).patch(updateTour).delete(deleteTour);

export default tourRouter;
