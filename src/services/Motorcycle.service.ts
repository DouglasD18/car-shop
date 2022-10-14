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
    const cars = await this._motorcycles.read();

    return cars;
  }

  public async readOne(id: string): Promise<IMotorcycle> {
    const car = await this._motorcycles.readOne(id);

    if (!car) throw new Error(ErrorTypes.EntityNotFound);

    return car;
  }

  public async update(id: string, obj: IMotorcycle): Promise<IMotorcycle | null> {
    const parsed = MotorcycleZodSchema.safeParse(obj);
    if (!parsed.success) throw parsed.error;

    const foundedCar = await this._motorcycles.readOne(id);
    if (!foundedCar) throw new Error(ErrorTypes.EntityNotFound);
    
    const car = await this._motorcycles.update(id, obj);
    return car;
  }

  public async delete(id: string): Promise<IMotorcycle | null> {
    const foundedCar = await this._motorcycles.readOne(id); 
    if (!foundedCar) throw new Error(ErrorTypes.EntityNotFound);

    const car = await this._motorcycles.delete(id);
    return car;
  }
}

export default MotorcycleService;
