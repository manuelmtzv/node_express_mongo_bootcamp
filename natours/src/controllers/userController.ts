import { StatusTypes } from '@/enums/statusTypes';
import { Request, Response } from 'express';

const userController = {
  getAllUsers(_: Request, res: Response) {
    res.send({
      status: StatusTypes.success,
      message: 'Get all users',
    });
  },
  getUserById(req: Request, res: Response) {
    res.send({
      status: StatusTypes.success,
      message: `Get user with id ${req.params.id}`,
    });
  },
  createUser(req: Request, res: Response) {
    res.send({
      status: StatusTypes.success,
      message: 'Create user',
    });
  },
  updateUser(req: Request, res: Response) {
    res.send({
      status: StatusTypes.success,
      message: `Update user with id ${req.params.id}`,
    });
  },
  deleteUser(_: Request, res: Response) {
    res.status(204).send();
  },
};

export default userController;
