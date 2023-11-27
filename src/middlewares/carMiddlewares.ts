import { Request, Response, NextFunction } from 'express';
import { carRepository } from '../repositories/carsRepository';
import { CarCreateError } from '../errors/appError';

export const carAlreadyExistMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { licenseplate } = req.body;

    const existingCar = await carRepository.findOne({
        where: { licenseplate: licenseplate.toLowerCase() },
      });

    if (existingCar) {
      throw new CarCreateError('Carro já existe');
    }


    next();
  } catch (error: any) {

    console.error('Error in carAlreadyExist:', error);
    res.status(400).json({ error: error.message });
  }
};
