import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MicroservicesEnum } from 'src/common/constants';
import { envs } from 'src/config';

@Module({
  imports: [
    // Asi conecto el products-ms con el client-gateway
    ClientsModule.register([
      {
        name: MicroservicesEnum.PRODUCT_MS,
        transport: Transport.TCP,
        options: {
          host: envs.productsMicroserviceHost,
          port: envs.productsMicroservicePort,
        },
      },
    ]),
  ],
  controllers: [ProductsController],
  providers: [],
})
export class ProductsModule {}
