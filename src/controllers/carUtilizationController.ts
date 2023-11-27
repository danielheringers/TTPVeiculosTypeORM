import { Request, Response } from 'express';
import { startCarUtilizationService } from '../services/carUtilization/startcarUtilizationService';
import { CarUtilization } from '../entities/CarUtilizationEntity';
import { DeepPartial } from 'typeorm';
import { endCarUtilizationService } from '../services/carUtilization/endCarUtilizationService';
import { listCarUtilizationService } from '../services/carUtilization/listCarUtilizationService';

export const startCarUtilizationController = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { driverId, carId, reasonForUse } = req.body;
      const data = await startCarUtilizationService(req.body);
      res.status(201).json(data);
    } catch (error) {
      console.error('Error in startCarUtilizationController:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  export const endCarUtilizationController = async (req: Request, res: Response): Promise<Response> => {
    try {
      const dataId = parseInt(req.params.driverId, 10);
      const data = await endCarUtilizationService({ driverId: dataId }); // Passar como objeto
      return res.status(200).json(data);
    } catch (error: any) {
      console.error('Error in endCarUtilizationController:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

export const listCarUtilizationController = async (req: Request, res: Response): Promise<Response> => {
  try {
    const data = await listCarUtilizationService();
    return res.status(200).json(data);
  } catch (error: any) {
    console.error('Error in listCarUtilizationController:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
