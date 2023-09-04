import { Router } from 'express';
import userController from '@/controllers/userController';

const { getAllUsers, createUser, getUserById, updateUser, deleteUser } =
  userController;

const router = Router();

router.route('/').get(getAllUsers).post(createUser);

router.route('/:id').get(getUserById).patch(updateUser).delete(deleteUser);

export default router;
