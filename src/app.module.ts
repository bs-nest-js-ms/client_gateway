import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { CommonModule } from './common/common.module';
import { OrdersModule } from './orders/orders.module';
import { NatsModule } from './transports/nats.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ProductsModule, CommonModule, OrdersModule, NatsModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
