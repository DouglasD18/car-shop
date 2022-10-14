import { ErrorTypes } from '../errors/catalog';
import { IModel } from '../interfaces/IModel';
import { IMotorcycle, MotorcycleZodSchema } from '../interfaces/IMotorcycle';
import { IService } from '../interfaces/IService';

class MotorcycleService implements IService<IMotorcycle> {
  constructor(private _motorcycles: IModel<IMotorcycle>) { }

  public async create(obj: IMotorcycle): Promise<IMotorcycle> {
    const parsed = MotorcycleZodSchema.safeParse(obj);
    if (!parsed.success) throw parsed.error;

    const motorcycle = await this._motorcycles.create(parsed.data);
    return motorcycle;
  }
  public async read(): Promise<IMotorcycle[]> {
    const motorcycles = await this._motorcycles.read();

    return motorcycles;
  }

  public async readOne(id: string): Promise<IMotorcycle> {
    const motorcycle = await this._motorcycles.readOne(id);

    if (!motorcycle) throw new Error(ErrorTypes.EntityNotFound);

    return motorcycle;
  }

  public async update(id: string, obj: IMotorcycle): Promise<IMotorcycle | null> {
    const parsed = MotorcycleZodSchema.safeParse(obj);
    if (!parsed.success) throw parsed.error;

    const founded = await this._motorcycles.readOne(id);
    if (!founded) throw new Error(ErrorTypes.EntityNotFound);
    
    const motorcycle = await this._motorcycles.update(id, obj);
    return motorcycle;
  }

  public async delete(id: string): Promise<IMotorcycle | null> {
    const founded = await this._motorcycles.readOne(id); 
    if (!founded) throw new Error(ErrorTypes.EntityNotFound);

    const motorcycle = await this._motorcycles.delete(id);
    return motorcycle;
  }
}

export default MotorcycleService;
