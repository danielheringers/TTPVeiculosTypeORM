import AppDataSource from '../../data-source';
import { Cars } from '../../entities/CarsEntity'; 

export const deleteCarService = async (data: string): Promise<void> => {
  try {
    const carRepository = AppDataSource.getRepository(Cars);

    await carRepository.update({ licenseplate: data.toLowerCase() }, { deleted: true });
  } catch (error) {
    throw error;
  }
};
