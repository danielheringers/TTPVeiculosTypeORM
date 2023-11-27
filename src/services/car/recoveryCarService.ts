import AppDataSource from '../../data-source';
import { Cars } from '../../entities/CarsEntity';
import { NotFoundError } from '../../errors/appError';

export const recoveryCarService = async (data: string) => {
  try {
    const carRepository = AppDataSource.getRepository(Cars);

    const deletedCar = await carRepository.findOne({
      where: { licenseplate: data.toLowerCase(), deleted: true },
      select: ['id', 'licenseplate', 'color', 'brand'],
    });

    if (!deletedCar) {
      throw new NotFoundError('No vehicles found');
    }

    await carRepository.update(deletedCar.id, { deleted: false });

    return deletedCar;
  } catch (error: any) {
    throw new NotFoundError(error.message);
  }
};
