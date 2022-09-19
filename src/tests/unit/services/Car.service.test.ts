import { expect } from 'chai';
import * as sinon from 'sinon';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catalog';
import { ICar } from '../../../interfaces/ICar';
import Cars from '../../../models/Cars.model';
import CarsService from '../../../services/Cars.service';
import { carMock, carsMock, carMockWithId } from '../../mocks/Car.mock';

describe('Car Service', () => {
	const carModel = new Cars();
	const carService = new CarsService(carModel);

  describe('List all cars', () => {
    beforeEach(() => {
      sinon.stub(carModel, 'read').resolves(carsMock);
    })

    afterEach(() => {
      sinon.restore()
    })

    it('Should return an array', async () => {
      const cars = await carService.read();

      expect(cars).to.be.an('array');
    })
  })

	describe('Create Car', () => {
    beforeEach(() => {
      sinon.stub(carModel, 'create').resolves(carMockWithId);
    })

    afterEach(() => {
      sinon.restore()
    })

		it('Should return the car created', async () => {
			const carCreated = await carService.create(carMock);

			expect(carCreated).to.be.deep.equal(carMockWithId);
		});

		it('Should return an error', async () => {
      let error;
			try {
				await carService.create({} as ICar);
			} catch (err) {
        error = err
			}

      expect(error).to.be.instanceOf(ZodError);
		});
	});

	describe('ReadOne Car', () => {
    // const id = '69cf1fc6498565d94eba52cd'

    beforeEach(() => {
      sinon.stub(carModel, 'readOne')
			.onCall(0).resolves(carMockWithId) 
			.onCall(1).resolves(null); 
    })

    afterEach(() => {
      sinon.restore()
    })

		it('Should return the correct car', async () => {
			const car = await carService.readOne(carMockWithId._id);

			expect(car).to.be.deep.equal(carMockWithId);
		});

		// it('Shoud return an error', async () => {
    //   let error;
		// 	try {
		// 		await carService.readOne(id);
		// 	} catch (err:any) {
    //     error = err
		// 	}
    //   expect(error.code).to.be.equal(404);
    //   expect(error.error).to.be.deep.equal(ErrorTypes.EntityNotFound);
		// });
	});

  describe('Delete a car', () => {
    beforeEach(() => {
      sinon.stub(carModel, 'readOne')
			.onCall(0).resolves(carMockWithId) 
      sinon.stub(carModel, 'delete')
        .onCall(0).resolves(carMockWithId)
    });

    afterEach(sinon.restore);

    it('Should return the car deleted',async () => {
      const car = await carService.delete(carMockWithId._id);

      expect(car).to.be.deep.equal(carMockWithId);
    });
  });
});