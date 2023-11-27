import express from 'express';
import { endCarUtilizationController, listCarUtilizationController, startCarUtilizationController} from '../controllers/carUtilizationController';

export const carUtilizationRouter = express.Router();

carUtilizationRouter.post('/start', startCarUtilizationController);
carUtilizationRouter.post('/end/:driverId', endCarUtilizationController);
carUtilizationRouter.get('/', listCarUtilizationController)
