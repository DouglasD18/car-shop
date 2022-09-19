import { ErrorTypes } from '../errors/catalog';
import { CarZodSchema, ICar } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import { IService } from '../interfaces/IService';

class CarsService implements IService<ICar> {
  constructor(private _cars: IModel<ICar>) { }

  public async create(obj: ICar):Promise<ICar> {
    const parsed = CarZodSchema.safeParse(obj);
    
    if (!parsed.success) {
      throw parsed.error;
    }

    const car = await this._cars.create(parsed.data);
    return car;
  }

  public async read(): Promise<ICar[]> {
    const cars = await this._cars.read();
    return cars;
  }

  public async readOne(id: string): Promise<ICar> {
    const car = await this._cars.readOne(id);

    if (!car) throw new Error(ErrorTypes.EntityNotFound);

    return car;
  }

  public async update(id: string, obj: ICar): Promise<ICar | null> {
    const car = await this._cars.update(id, obj);
    return car;
  }

  public async delete(id: string): Promise<ICar | null> {
    const car = await this._cars.delete(id);
    return car;
  }
}

export default CarsService;
