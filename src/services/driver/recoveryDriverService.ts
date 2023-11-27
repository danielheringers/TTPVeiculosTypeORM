
import AppDataSource from '../../data-source';
import { Drivers } from '../../entities/DriversEntity';
import { NotFoundError } from '../../errors/appError';

export const recoveryDriverService = async (data: string): Promise<any> => {
  try {
    const driverRepository = AppDataSource.getRepository(Drivers);

    const deletedDriver = await driverRepository.findOne({
      where: { cnh: data.toLowerCase(), deleted: true },
    });

    if (!deletedDriver) {
      throw new NotFoundError('No drivers found');
    }

    deletedDriver.deleted = false;
    await driverRepository.save(deletedDriver);

    return deletedDriver;
  } catch (error: any) {
    throw new NotFoundError(error.message);
  }
};
