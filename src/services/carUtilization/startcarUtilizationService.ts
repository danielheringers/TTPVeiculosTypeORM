import { CarUtilization } from '../../entities/CarUtilizationEntity';
import { Cars } from '../../entities/CarsEntity'
import { Drivers } from '../../entities/DriversEntity';
import AppDataSource from '../../data-source';
import { IsNull } from 'typeorm';


export const startCarUtilizationService = async (data: {
    driverId: number;
    carId: number;
    reasonForUse: string;
  }): Promise<{}> => {
    const { driverId, carId, reasonForUse } = data;
  
    const carUtilizationRepository = AppDataSource.getRepository(CarUtilization);
    const driversRepository = AppDataSource.getRepository(Drivers);
    const carsRepository = AppDataSource.getRepository(Cars);
  
    const existingUtilization = await AppDataSource.getRepository(CarUtilization).find({
        relations: ['driver'],
        where: { driver: { id: driverId }, enddate: IsNull() },
      });
    if (existingUtilization.length === 0) {

        const driverFind = await driversRepository.findOne({select: {id: true, name: true}, where: {id: driverId} }) as any;        
        const carFind = await carsRepository.findOne({select: {id: true, licenseplate: true, color: true, model: true, brand: true, year: true}, where: {id: carId} }) as any;       

        const newUtilization = carUtilizationRepository.create({
            driver: driverFind.id,
            car: carFind.id,
            reasonforuse: reasonForUse,
            initialdate: new Date(),
            enddate: null as any,
          });
        const savedUtilization = await carUtilizationRepository.save(newUtilization);

        
        const result = {
            driver: {
            id: driverFind.id,
            name: driverFind.name,
            },
            car: {
            id: carFind.id,
            licenseplate: carFind.licenseplate,
            color: carFind.color,
            model: carFind.model,
            brand: carFind.brand,
            year: carFind.year,
            },
            carutilization: {
            id: savedUtilization.id,
            initialdate: savedUtilization.initialdate,
            enddate: savedUtilization.enddate,
            reasonforuse: savedUtilization.reasonforuse
            }
        };

        return result;
    }
  
    throw new Error('The driver is already using another car');
  };
  
