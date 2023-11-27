import { Request, Response } from 'express';
import { createDriverService } from '../services/driver/createDriverService';
import { deleteDriverService } from '../services/driver/deleteDriverService';
import { listDriverService } from '../services/driver/listDriverService';
import { recoveryDriverService } from '../services/driver/recoveryDriverService';
import { updateDriverService } from '../services/driver/updateDriverService';
import { driverReturnSerializer } from '../serializers/driverSerializer';

export const createDriverController = async (req: Request, res: Response): Promise<Response> => {
  try {
    const data = await createDriverService(req.body);
    return res.status(201).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteDriverController = async (req: Request, res: Response): Promise<Response> => {
  try {
    const data = await deleteDriverService(req.params.id);
    if (data) {
      return res.status(204).json(data);
    } else {
      return res.status(404).json({ error: 'Driver not found' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const listDriverController = async (req: Request, res: Response): Promise<Response> => {
  try {
    const filter = req.params.filter;
    const data = await listDriverService(filter);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const recoveryDriverController = async (req: Request, res: Response): Promise<Response> => {
  try {
    const data = await recoveryDriverService(req.params.id);
    if (data) {
      return res.status(200).json(data);
    } else {
      return res.status(404).json({ error: 'Driver not found' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateDriverController = async (req: Request, res: Response): Promise<Response> => {
  try {
    const data = await updateDriverService(req.params.id, req.body);
    if (data) {
      return res.status(200).json(data);
    } else {
      return res.status(404).json({ error: 'Driver not found' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
