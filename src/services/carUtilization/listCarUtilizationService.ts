import AppDataSource from '../../data-source';
import { CarUtilization } from '../../entities/CarUtilizationEntity';
import { NotFoundError } from '../../errors/appError';

export const listCarUtilizationService = async () => {
  try {
    const carUtilizationRepository = AppDataSource.getRepository(CarUtilization);

    const carUtilizations = await carUtilizationRepository.find({
      select: ['id', 'initialdate', 'enddate', 'reasonforuse', 'driver', 'car'],
    });

    if (carUtilizations.length > 0) {
      return carUtilizations;
    } else {
      throw new NotFoundError('No car utilizations found');
    }
  } catch (error) {
    throw new NotFoundError('An unexpected error occurred');
  }
};

