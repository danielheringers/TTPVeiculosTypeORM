import AppDataSource from "../data-source";
import { Cars } from "../entities/CarsEntity";

export const carRepository = AppDataSource.getRepository(Cars);