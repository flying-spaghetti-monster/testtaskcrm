import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @Get(':id')
  findAll(@Param('id', ParseIntPipe) customerId: number) {
    return this.ordersService.findCustomerOrders(customerId);
  }
}
