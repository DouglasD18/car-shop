import express from 'express';
import 'express-async-errors';
import errorHandler from './middlewares/errorHandler';
import carRoute from './routes/Cars.route';
import motorcycleRouter from './routes/Motorcycle.route';

const app = express();
app.use(express.json());

app.use(carRoute);
app.use(motorcycleRouter);
app.use(errorHandler);

export default app;
