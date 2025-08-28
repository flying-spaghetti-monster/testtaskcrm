import { Test, TestingModule } from '@nestjs/testing';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';

describe('CustomersController', () => {
  let controller: CustomersController;
  let service: CustomersService;

  const mockCustomersService = {
    findAll: jest.fn().mockResolvedValue({
      customers: [{
        id: 1,
        firstName: "Adelle",
        lastName: "Summers",
        email: "bookings2032@example.com",
        gender: "Other",
        country: "Greenland",
        city: "Altamonte Springs",
        state: "Delaware",
        postCode: "83892",
        street: "Letterman Hospital Access",
        streetNumber: "1279"
      }],
      total: 1,
    }),
    findOne: jest.fn().mockResolvedValue({
      id: 1,
      firstName: "Adelle",
      lastName: "Summers",
      email: "bookings2032@example.com",
      gender: "Other",
      country: "Greenland",
      city: "Altamonte Springs",
      state: "Delaware",
      postCode: "83892",
      street: "Letterman Hospital Access",
      streetNumber: "1279"
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomersController],
      providers: [
        {
          provide: CustomersService,
          useValue: mockCustomersService,
        },
      ],
    }).compile();

    controller = module.get<CustomersController>(CustomersController);
    service = module.get<CustomersService>(CustomersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all customers', async () => {
      const result = await controller.findAll({ skip: 0, take: 10 });
      expect(result).toEqual(await mockCustomersService.findAll({ skip: 0, take: 10 }));
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single customer', async () => {
      const result = await controller.findOne(1);
      expect(result).toEqual(await mockCustomersService.findOne(1));
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });
});