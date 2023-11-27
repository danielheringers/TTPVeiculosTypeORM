import AppDataSource from '../../data-source';
import { Drivers } from '../../entities/DriversEntity';
import { driverReturnSerializer } from '../../serializers/driverSerializer';

export const updateDriverService = async (cnh: string, data: any): Promise<any> => {
  try {
    const driverRepository = AppDataSource.getRepository(Drivers);

    const keys = Object.keys(data);
    const values = Object.values(data);

    if (keys.length === 0) {
      throw new Error('No fields provided for update');
    }

    const updateData: Record<string, any> = {};
    keys.forEach((key, index) => {
      updateData[key] = typeof values[index] === 'string' ? (values[index] as string).toLowerCase() : values[index];
    });

    const updateResult = await driverRepository
      .createQueryBuilder()
      .update(Drivers)
      .set(updateData)
      .where('cnh = :cnh', { cnh: cnh.toLowerCase() })
      .execute();

    if (updateResult.affected === 0) {
      throw new Error('Driver not found');
    }

    const updatedDriver = await driverRepository.findOne({ where: { cnh: cnh.toLowerCase() } });

    if (!updatedDriver) {
      throw new Error('Failed to retrieve updated driver');
    }

    const returnedDriver = await driverReturnSerializer.validate(updatedDriver);

    return returnedDriver;
  } catch (error) {
    throw error;
  }
};
