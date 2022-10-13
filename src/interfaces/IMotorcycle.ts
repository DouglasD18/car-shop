import { z } from 'zod';
import { VehicleZodSchema } from './IVehicle';

export const MotorcycleZodSchema = VehicleZodSchema.extend({
  category: z.enum(['Street', 'Custom', 'Trail']),
  engineCapacity: z.number({
    required_error: 'engineCapacit is required',
    invalid_type_error: 'engineCapacit must be a number',
  }).int().lte(2500).positive(),
});

export type IMotorcycle = z.infer<typeof MotorcycleZodSchema>;
