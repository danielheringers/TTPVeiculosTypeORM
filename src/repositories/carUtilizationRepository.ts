import AppDataSource from "../data-source";
import { CarUtilization } from "../entities/CarUtilizationEntity";

export const carUtilizationRepository = AppDataSource.getRepository(CarUtilization);