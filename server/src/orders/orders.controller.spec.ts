import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

describe('OrdersController', () => {
  let controller: OrdersController;
  let service: OrdersService;

  const mockOrders = [
    { id: 1, number: 1, price: 100, currency: 'USD', itemName: 'Item A', amount: 2, customerId: 1, createdAt: new Date('2025-01-01'), shippedAt: new Date('2025-01-02') },
  ];

  const mockOrdersService = {
    findCustomerOrders: jest.fn().mockResolvedValue(mockOrders),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [
        {
          provide: OrdersService,
          useValue: mockOrdersService,
        },
      ],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
    service = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return customer orders', async () => {
      const result = await controller.findAll(1);
      expect(result).toEqual(mockOrders);
      expect(service.findCustomerOrders).toHaveBeenCalledWith(1);
    });
  });
});