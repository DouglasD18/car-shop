import { Model, isValidObjectId, UpdateQuery } from 'mongoose';
import { ErrorTypes } from '../errors/catalog';
import { IModel } from '../interfaces/IModel';

abstract class MongoModel<T> implements IModel<T> {
  protected _model:Model<T>;

  constructor(model:Model<T>) {
    this._model = model;
  }

  public async create(obj:T):Promise<T> {
    return this._model.create({ ...obj });
  }

  public async read(): Promise<T[]> {
    return this._model.find();
  }

  public async readOne(id:string):Promise<T | null> {
    if (!isValidObjectId(id)) throw new Error(ErrorTypes.InvalidMongoId);
    return this._model.findOne({ id });
  }

  public async update(id: string, obj: T): Promise<T | null> {
    const result = await this._model.findOneAndUpdate(
      { _id: id },
      { ...obj } as UpdateQuery<T>,
      { new: true },
    );

    return result as T;
  }

  public async delete(id: string): Promise<T | null> {
    return this._model.remove({ id });
  }
}

export default MongoModel;
