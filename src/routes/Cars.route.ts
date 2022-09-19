import { Router } from 'express';
import CarController from '../controllers/Cars.controller';
import Cars from '../models/Cars.model';
import CarsService from '../services/Cars.service';

const carRoute = Router();

const car = new Cars();
const carService = new CarsService(car);
const carController = new CarController(carService);

carRoute.post('/cars', (req, res) => carController.create(req, res));
carRoute.get('/cars', (req, res) => carController.read(req, res));
carRoute.get('/cars/:id', (req, res) => carController.readOne(req, res));
carRoute.put('/cars/:id', (req, res) => carController.update(req, res));
carRoute.delete('/cars/:id', (req, res) => carController.delete(req, res));

export default carRoute;
