
import express from 'express';
import { createCarController, deleteCarController, listCarController, recoveryCarController, updateCarController } from '../controllers/carController';
import { carAlreadyExistMiddleware } from '../middlewares/carMiddlewares';

export const carRouter = express.Router();

carRouter.patch('/recovery/:licenseplate', recoveryCarController);

carRouter.patch('/update/:id', updateCarController);

carRouter.get('/:filter', listCarController);

carRouter.get('/:filter?/:filterB?', listCarController);

carRouter.post('/', carAlreadyExistMiddleware, createCarController);

carRouter.delete('/:id', deleteCarController);
