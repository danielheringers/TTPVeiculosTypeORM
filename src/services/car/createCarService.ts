import { CarCreateError } from '../../errors/appError';
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { carRepository } from '../../repositories/carRepository';
import { ICarReturn, ICreateCarData } from '../../interfaces/carInterface';

class CarReturn implements ICarReturn {
    id: number;
    licenseplate: string;
    color: string;
    brand: string;
    model: string;
    year: number;
}

export const createCarService = async (data: ICreateCarData): Promise<CarReturn> => {
    const {licenseplate, color, brand, model } = data;
    const licenseplateLow = licenseplate.toLowerCase()
    const colorLow = color.toLowerCase()
    const brandLow = brand.toLowerCase()
    const modelLow = model.toLowerCase()
  try {
    const newCar = carRepository.create({
      licenseplate: licenseplateLow,
      color: colorLow,
      brand: brandLow,
      model: modelLow,
      year: data.year,
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
