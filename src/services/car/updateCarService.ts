import AppDataSource from '../../data-source';
import { Cars } from '../../entities/CarsEntity';
import { NotFoundError } from '../../errors/appError';
import { IUpdateCarData } from '../../interfaces/carsInterface';



export const updateCarService = async (licenseplate: string, data: IUpdateCarData) => {
    try {
      const carRepository = AppDataSource.getRepository(Cars);
  

      const existingCar = await carRepository.findOne({
        where: { licenseplate },
      });
  
      if (!existingCar) {
        throw new NotFoundError('Car not found');
      }
  
      const updatedCar = await carRepository.save(Object.assign(existingCar, data));
  
      return updatedCar;
    } catch (error) {
      throw error;
    }
};