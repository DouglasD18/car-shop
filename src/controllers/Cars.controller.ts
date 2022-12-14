import { Request, Response } from 'express';
import { IService } from '../interfaces/IService';
import { ICar } from '../interfaces/ICar';

class CarController {
  constructor(private _service: IService<ICar>) { }

  public async create(req: Request & { body: ICar }, res: Response<ICar>) {
    const results = await this._service.create(req.body);

    return res.status(201).json(results);
  }

  public async read(_req: Request, res: Response<ICar[]>) {
    const results = await this._service.read();

    return res.status(200).json(results);
  }

  public async readOne(req: Request, res: Response<ICar>) {
    const result = await this._service.readOne(req.params.id);

    if (!result) return false;

    return res.status(200).json(result);
  }

  public async update(req: Request & { body: ICar }, res: Response<ICar>) {
    const updated = await this._service.update(req.params.id, req.body);

    if (!updated) return false;

    return res.status(200).json(updated);
  }

  public async delete(req: Request, res: Response<ICar>) {
    const deleted = await this._service.delete(req.params.id);

    if (!deleted) return false;

    return res.status(204).json(deleted);
  }
}

export default CarController;
