import AppDataSource from "../data-source";
import { Drivers } from "../entities/DriversEntity";

export const driverRepository = AppDataSource.getRepository(Drivers);