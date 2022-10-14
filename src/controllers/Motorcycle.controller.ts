import { Request, Response } from 'express';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import { IService } from '../interfaces/IService';

class MotorcycleController {
  constructor(private _service: IService<IMotorcycle>) { }

  public async create(req: Request & { body: IMotorcycle }, res: Response<IMotorcycle>) {
    const motorcycle = await this._service.create(req.body);

    return res.status(201).json(motorcycle);
  }

  public async read(_req: Request, res: Response<IMotorcycle[]>) {
    const motorcycles = await this._service.read();

    return res.status(200).json(motorcycles);
  }

  public async readOne(req: Request, res: Response<IMotorcycle>) {
    const { id } = req.params;
    const motorcycle = await this._service.readOne(id);

    if (!motorcycle) return false;

    return res.status(200).json(motorcycle);
  }
}

export default MotorcycleController;
