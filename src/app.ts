import "reflect-metadata";
import "express-async-errors";
import express from "express";
import { handleAppError } from "./errors/appError";
import { carRouter } from "./routes/carRoutes";
import { driverRouter } from "./routes/driverRoutes";
import { carUtilizationRouter } from "./routes/carUtilizationRoutes";


const app = express();
app.use(express.json());
app.use('/cars', carRouter);
app.use('/drivers', driverRouter);
app.use('/carutilization', carUtilizationRouter);
app.use(handleAppError);

export default app;