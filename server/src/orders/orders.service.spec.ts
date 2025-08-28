import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Orders } from '@prisma/client';

describe('OrdersService', () => {
  let service: OrdersService;
  let prisma: PrismaService;

  const mockOrders: Orders[] = [
    { id: 1, number: 1, price: 100, currency: 'USD', itemName: 'Item A', amount: 2, customerId: 1, createdAt: new Date('2025-01-01'), shippedAt: new Date('2025-01-02') },
    { id: 2, number: 2, price: 50, currency: 'USD', itemName: 'Item B', amount: 1, customerId: 1, createdAt: new Date('2025-01-03'), shippedAt: new Date('2025-01-04') },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: PrismaService,
          useValue: {
            orders: {
              findMany: jest.fn().mockResolvedValue(mockOrders),
            },
          },
        },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findCustomerOrders', () => {
    it('should return orders for a given customer', async () => {
      const result = await service.findCustomerOrders(1);
      expect(result).toEqual(mockOrders);
      expect(prisma.orders.findMany).toHaveBeenCalledWith({
        where: { customerId: 1 },
        orderBy: { createdAt: 'desc' },
      });
    });

    it('should return empty array if no orders', async () => {
      (prisma.orders.findMany as jest.Mock).mockResolvedValueOnce([]);
      const result = await service.findCustomerOrders(999);
      expect(result).toEqual([]);
    });
  });
});