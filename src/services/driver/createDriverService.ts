import AppDataSource from '../../data-source';
import { Drivers } from '../../entities/DriversEntity';
import { DriverCreateError } from '../../errors/appError';
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { ICreateDriverData, IDriverReturn } from '../../interfaces/driverInterface';

class DriverReturn implements IDriverReturn {
  id: number;
  name: string;
  cnh: string;
}

export const createDriverService = async (data: ICreateDriverData): Promise<IDriverReturn> => {
    const { name, cnh } = data;
    const nameLow = name.toLowerCase();
    const cnhLow = cnh.toLowerCase();
  try {
    const driverRepository = AppDataSource.getRepository(Drivers);

    const newDriver = driverRepository.create({
      name: nameLow,
      cnh: cnhLow,
    });

    await validateOrReject(newDriver);

    const savedDriver = await driverRepository.save(newDriver);

    const returnedDriver = plainToClass(DriverReturn, savedDriver, { excludeExtraneousValues: true });

    return returnedDriver;
  } catch (error: any) {
    if (error.code === '23505' && error.constraint === 'drivers_cnh_key') {
      throw new DriverCreateError('Driver already exists');
    }
    throw error;
  }
};
