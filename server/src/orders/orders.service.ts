import { Injectable } from '@nestjs/common';
import { Orders } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) { }

  async findCustomerOrders(customerId: number): Promise<Orders[]> {
    return this.prisma.orders.findMany({
      where: {
        customerId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }
}
