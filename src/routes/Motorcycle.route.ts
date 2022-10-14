import { Router } from 'express';
import MotorcycleController from '../controllers/Motorcycle.controller';
import Motorcycles from '../models/Motorcycle.model';
import MotorcycleService from '../services/Motorcycle.service';

const motorcycleRouter = Router();

const motorcycle = new Motorcycles();
const motorcycleService = new MotorcycleService(motorcycle);
const motorcycleController = new MotorcycleController(motorcycleService);

const ROUTE = '/motorcycles/:id';

motorcycleRouter.post('/motorcycles', (req, res) => motorcycleController.create(req, res));
motorcycleRouter.get('/motorcycles', (req, res) => motorcycleController.read(req, res));
motorcycleRouter.get(ROUTE, (req, res) => motorcycleController.readOne(req, res));
motorcycleRouter.put(ROUTE, (req, res) => motorcycleController.update(req, res));
motorcycleRouter.delete(ROUTE, (req, res) => motorcycleController.delete(req, res));

export default motorcycleRouter;
