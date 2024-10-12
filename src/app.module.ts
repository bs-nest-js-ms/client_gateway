import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { CommonModule } from './common/common.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [ProductsModule, CommonModule, OrdersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
