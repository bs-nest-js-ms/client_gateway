import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MicroservicesEnum } from '../common/constants/microservices-constants';
import { envs } from 'src/config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: MicroservicesEnum.ORDERS_MS,
        transport: Transport.TCP,
        options: {
          host: envs.ordersMicroserviceHost,
          port: envs.ordersMicroservicePort,
        },
      },
    ]),
  ],
  controllers: [OrdersController],
  providers: [],
})
export class OrdersModule {}
