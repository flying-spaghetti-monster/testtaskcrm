import { Test, TestingModule } from '@nestjs/testing';
import { CustomersService } from './customers.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Customers } from '@prisma/client';

describe('CustomersService', () => {
  let service: CustomersService;
  let prisma: PrismaService;

  const mockCustomers: Partial<Customers>[] = [
    {
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
    },
    {
      id: 2,
      firstName: "Sixta",
      lastName: "Dean",
      email: "phoenix2098@gmail.com",
      gender: "Fluid",
      country: "Czech Republic",
      city: "Coconut Creek",
      state: "Washington",
      postCode: "33093",
      street: "Mahan",
      streetNumber: "133"
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomersService,
        {
          provide: PrismaService,
          useValue: {
            customers: {
              findMany: jest.fn().mockResolvedValue(mockCustomers),
              count: jest.fn().mockResolvedValue(mockCustomers.length),
              findUnique: jest.fn().mockImplementation(({ where }) =>
                mockCustomers.find(c => c.id === where.id) || null,
              ),
            },
          },
        },
      ],
    }).compile();

    service = module.get<CustomersService>(CustomersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return customers and total', async () => {
      const result = await service.findAll({ skip: 0, take: 10 });
      expect(result.customers).toEqual(mockCustomers);
      expect(result.total).toEqual(mockCustomers.length);
      expect(prisma.customers.findMany).toHaveBeenCalled();
      expect(prisma.customers.count).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single customer', async () => {
      const result = await service.findOne(1);
      expect(result).toEqual(mockCustomers[0]);
    });

    it('should return null if customer not found', async () => {
      const result = await service.findOne(999);
      expect(result).toBeNull();
    });
  });
});