import * as yup from "yup";
import { ICarReturn, ICreateCarData } from "../interfaces/carsInterface";




export const newCarSerializer: yup.ObjectSchema<ICreateCarData> = yup.object().shape({
    licenseplate: yup.string().required(),
    color: yup.string().required(),
    brand: yup.string().required(),
    model: yup.string().required(),
    year: yup.number().required()
});

export const carReturnSerializer: yup.ObjectSchema<ICarReturn> = yup.object().shape({
    id: yup.number().required(),
    licenseplate: yup.string().required(),
    color: yup.string().required(),
    brand: yup.string().required(),
    model: yup.string().required(),
    year: yup.number().required(),
});
