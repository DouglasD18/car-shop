import { Router } from 'express';
import MotorcycleController from '../controllers/Motorcycle.controller';
import Motorcycles from '../models/Motorcycle.model';
import MotorcycleService from '../services/Motorcycle.service';

const motorcycleRouter = Router();

const motorcycle = new Motorcycles();
const motorcycleService = new MotorcycleService(motorcycle);
const motorcycleController = new MotorcycleController(motorcycleService);

motorcycleRouter.post('/motorcycles', (req, res) => motorcycleController.create(req, res));

export default motorcycleRouter;
