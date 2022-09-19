import { expect } from 'chai';
import * as sinon from 'sinon';
import { Request, Response } from 'express';
import { carMock, carMockWithId, carsMock } from '../../mocks/Car.mock';
import Cars from '../../../models/Cars.model';
import CarsService from '../../../services/Cars.service';
import CarController from '../../../controllers/Cars.controller';


describe('Car Controller', () => {
  const carModel = new Cars()
  const carService = new CarsService(carModel);
  const carController = new CarController(carService);
  
  const req = {} as Request; 
  const res = {} as Response;

  describe('Read cars', () => {
    beforeEach(() => {
      sinon.stub(carService, 'read').resolves(carsMock);

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    });

    afterEach(sinon.restore);

    it('Shoud return status 200', async () => {
      await carController.read(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
    })
  });
  
  describe('Create car', () => {
    beforeEach(() => {
      sinon.stub(carService, 'create').resolves(carMockWithId);

      req.body = carMock;
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    });

    afterEach(sinon.restore);

    it('Should return status 201 and the created car', async () => {
      await carController.create(req, res);

      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockWithId)).to.be.true;
    });
  });

  describe('ReadOne car', () => {
    beforeEach(() => {
      sinon.stub(carService, 'readOne').resolves(carMockWithId);

      req.params = { id: carMockWithId._id };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    });

    afterEach(sinon.restore);

    it('Should return status 200 and the correct car', async () => {
      await carController.readOne(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockWithId)).to.be.true;
    });
  });
});
