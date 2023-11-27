import { Cars } from '../../entities/CarsEntity';
import { CarCreateError } from '../../errors/appError';
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import AppDataSource from '../../data-source';

interface ICreateCarData {
  licenseplate: string;
  color: string;
  brand: string;
  model: string;
  year: number;
}

interface ICarReturn {
  id: number;
  licenseplate: string;
  color: string;
  brand: string;
  model: string;
  year: number;
}

class CarReturn implements ICarReturn {
    id: number;
    licenseplate: string;
    color: string;
    brand: string;
    model: string;
    year: number;
}

export const createCarService = async (data: ICreateCarData): Promise<CarReturn> => {
  try {
    const carRepository = AppDataSource.getRepository(Cars);
    const newCar = carRepository.create({
      licenseplate: data.licenseplate.toLowerCase(),
      color: data.color.toLowerCase(),
      brand: data.brand.toLowerCase(),
      model: data.model.toLowerCase(),
      year:  data.year
    });

    await validateOrReject(newCar);

    const savedCar = await carRepository.save(newCar);

    const returnedCar = plainToClass(CarReturn, savedCar, { excludeExtraneousValues: true });

    return returnedCar;
  } catch (error: any) {
    if (error.code === '23505' && error.constraint === 'cars_licenseplate_key') {
      throw new CarCreateError('Car already exist');
    }
    throw error;
  }
};
