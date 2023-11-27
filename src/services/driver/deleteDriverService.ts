import { Drivers } from '../../entities/DriversEntity';
import AppDataSource from '../../data-source';

export const deleteDriverService = async (data: string): Promise<string> => {
  try {
    const driverRepository = AppDataSource.getRepository(Drivers);

    await driverRepository.update({ cnh: data }, { deleted: true });
    return 'Driver successfully deleted';
  } catch (error) {
    throw error;
  }
};
