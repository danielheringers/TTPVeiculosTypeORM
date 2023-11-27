import { CarUtilization } from '../../entities/CarUtilizationEntity';
import AppDataSource from '../../data-source';
import { IsNull } from 'typeorm';

export const endCarUtilizationService = async (data: {
    driverId: number;
  }): Promise<{}> => {
    const { driverId } = data;
  
    const carUtilizationRepository = AppDataSource.getRepository(CarUtilization);
  

    const existingUtilization = await AppDataSource.getRepository(CarUtilization).findOne({
      relations: ['driver', 'car'],
      where: { driver: { id: driverId }, enddate: IsNull() },
    });
  
    if (existingUtilization) {
      existingUtilization.enddate = new Date();
      const updatedUtilization = await carUtilizationRepository.save(existingUtilization);
  
      const result = {
        driver: {
          id: existingUtilization.driver.id,
          name: existingUtilization.driver.name,
        },
        car: {
          id: existingUtilization.car.id,
          licenseplate: existingUtilization.car.licenseplate,
          color: existingUtilization.car.color,
          model: existingUtilization.car.model,
          brand: existingUtilization.car.brand,
          year: existingUtilization.car.year,
        },
        carutilization: {
          id: updatedUtilization.id,
          initialdate: updatedUtilization.initialdate,
          enddate: updatedUtilization.enddate,
          reasonforuse: updatedUtilization.reasonforuse,
        },
      };
  
      return result;
    }
  
    throw new Error('Driver is not currently using any car');
  };
  