import * as yup from 'yup';
import { ICreateDriverData, IDriverReturn } from '../interfaces/driverInterface';

export const createDriverSerializer: yup.ObjectSchema<ICreateDriverData> = yup.object().shape({
    name: yup.string().required(),
    cnh: yup.string().required(),
  });
  
export const driverReturnSerializer: yup.ObjectSchema<IDriverReturn> = yup.object().shape({
    id: yup.number().required(),
    name: yup.string().required(),
    cnh: yup.string().required(),
  });