import AppDataSource from '../../data-source';
import { Drivers } from '../../entities/DriversEntity';
import { NotFoundError } from '../../errors/appError';

export const listDriverService = async (filter?: string): Promise<any[]> => {
  try {
    const driverRepository = AppDataSource.getRepository(Drivers);

    if (!filter) {
      const drivers = await driverRepository.find({ where: { deleted: false } });
      return drivers;
    } else {
      const driver = await driverRepository.findOne({ where: { name: filter, deleted: false } });
      return driver ? [driver] : [];
    }
  } catch (error: any) {
    throw new NotFoundError(error.message);
  }
};
