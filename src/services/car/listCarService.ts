import AppDataSource from '../../data-source';
import { Cars } from '../../entities/CarsEntity';
import { NotFoundError } from '../../errors/appError';

export const listCarsService = async (filter: string | undefined, filterB: string | undefined) => {
  try {
    const carRepository = AppDataSource.getRepository(Cars);

    if (!filter && !filterB) {
      const cars = await carRepository.find({ where: { deleted: false }, select: ['id', 'licenseplate', 'color', 'brand', 'model', 'year'], });

      if (cars.length > 0) {
        return cars;
      }

      throw new NotFoundError('No vehicles found');
    }

    if (filter && !filterB) {
      const lowerCaseFilter = filter.toLowerCase();

      const carsByColor = await carRepository.find({
        where: { color: lowerCaseFilter, deleted: false },
        select: ['id', 'licenseplate', 'color', 'brand', 'model', 'year'],
      });

      const carsByBrand = await carRepository.find({
        where: { brand: lowerCaseFilter, deleted: false },
        select: ['id', 'licenseplate', 'color', 'brand', 'model', 'year'],
      });

      const carsByLicense = await carRepository.find({
        where: { licenseplate: lowerCaseFilter, deleted: false },
        select: ['id', 'licenseplate', 'color', 'brand', 'model', 'year'],
      });

      if (carsByColor.length > 0) {
        return carsByColor[0];
      } else if (carsByBrand.length > 0) {
        return carsByBrand[0];
      } else if (carsByLicense.length > 0) {
        return carsByLicense[0];
      } else {
        throw new NotFoundError('No vehicles found!');
      }
    }

    if (filter && filterB) {
      const lowerCaseFilter = filter.toLowerCase();
      const lowerCaseFilterB = filterB.toLowerCase();

      const cars = await carRepository.find({
        where: { color: lowerCaseFilter, brand: lowerCaseFilterB },
        select: ['id', 'licenseplate', 'color', 'brand', 'model', 'year'],
      });

      return cars;
    }
  } catch (error: any) {
    throw new NotFoundError(error.message);
  }
};
