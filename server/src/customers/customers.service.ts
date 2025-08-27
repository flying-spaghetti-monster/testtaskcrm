import { Injectable } from '@nestjs/common';
import { Customers } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetCategoriesDto } from './dto/get-customer.dto';

@Injectable()
export class CustomersService {
  constructor(private readonly prisma: PrismaService) { }

  async findAll(params: GetCategoriesDto): Promise<Partial<Customers>[]> {
    const { skip, take, ...filters } = params;

    const where = Object.fromEntries(
      Object.entries(filters).filter(([_, v]) => v !== undefined && v !== null)
    );

    return await this.prisma.customers.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        gender: true,
        country: true,
        city: true
      },
      skip,
      take,
      where,
    });
  }

  async findOne(id: number): Promise<Customers | null> {
    return this.prisma.customers.findUnique({
      where: {
        id: id,
      },
    });
  }

}
