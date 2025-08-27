import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CustomersModule } from './customers/customers.module';
import { OrdersModule } from './orders/orders.module';

@Module({
	imports: [
		ConfigModule.forRoot(),
		CustomersModule,
		OrdersModule
	],
	controllers: [],
	providers: [],
})
export class AppModule { }
