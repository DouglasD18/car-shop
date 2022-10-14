import { Router } from 'express';
import MotorcycleController from '../controllers/Motorcycle.controller';
import Motorcycles from '../models/Motorcycle.model';
import MotorcycleService from '../services/Motorcycle.service';

const motorcycleRouter = Router();

const motorcycle = new Motorcycles();
const motorcycleService = new MotorcycleService(motorcycle);
const motorcycleController = new MotorcycleController(motorcycleService);

motorcycleRouter.post('/motorcycles', (req, res) => motorcycleController.create(req, res));
motorcycleRouter.get('/motorcycles', (req, res) => motorcycleController.read(req, res));
motorcycleRouter.get('/motorcycles/:id', (req, res) => motorcycleController.readOne(req, res));

export default motorcycleRouter;
