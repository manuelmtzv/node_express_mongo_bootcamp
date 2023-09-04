import { Router } from 'express';
import tourController from '@/controllers/tourController';

const { getTours, createTour, updateTour, getTourById, deleteTour } =
  tourController;

const router = Router();

router.param('id', (req, res, next, val) => {
  console.log(`Tour id is: ${val}`);
  next();
});

router.route('/').get(getTours).post(createTour);

router.route('/:id').get(getTourById).patch(updateTour).delete(deleteTour);

export default router;
