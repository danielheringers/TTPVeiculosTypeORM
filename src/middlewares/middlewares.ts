import { Request, Response, NextFunction } from 'express';
import { carRepository } from '../repositories/carRepository';
import { driverRepository } from '../repositories/driverRespository';
import { CarCreateError } from '../errors/appError';
import { DriverCreateError } from '../errors/appError';

export const carAlreadyExistMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { licenseplate } = req.body;

    const existingCar = await carRepository.findOne({
        where: { licenseplate: licenseplate.toLowerCase() },
      });

    if (existingCar) {
      throw new CarCreateError('Car already exist');
    }


    next();
  } catch (error: any) {

    console.error('Error in carAlreadyExist:', error);
    res.status(400).json({ error: error.message });
  }
};

export const driverAlreadyExistsMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, cnh } = req.body;

    const existingDriver = await driverRepository.findOne({
      where: { name, cnh },
    });

    if (existingDriver) {
      throw new DriverCreateError('Driver already exists');
    }

    next();
  } catch (error: any) {
    console.error('Error in driverExistsMiddleware:', error);
    res.status(400).json({ error: error.message });
  }
};
