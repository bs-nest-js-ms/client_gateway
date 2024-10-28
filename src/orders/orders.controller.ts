import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { MicroservicesEnum, OrderTCP } from 'src/common/constants';
import { ChangeOrderStatusDto, CreateOrderDto, SearchOrderByDto } from './dto';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(MicroservicesEnum.ORDERS_MS)
    private readonly ordersClient: ClientProxy,
  ) {}

  @Get('')
  getOrders(@Query() searchOrderByDto: SearchOrderByDto) {
    return this.ordersClient
      .send({ cmd: OrderTCP.GET_ORDERS }, searchOrderByDto)
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        })
      );
  }

  @Get(':order_id')
  getOrder(@Param('order_id', ParseUUIDPipe) order_id: string) {
    return this.ordersClient
      .send({ cmd: OrderTCP.GET_ORDER }, { order_id: order_id })
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }

  @Post('')
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersClient
      .send({ cmd: OrderTCP.CREATE_ORDER }, createOrderDto)
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }

  @Patch('status/:order_id')
  changeOrderStatus(
    @Param('order_id', ParseUUIDPipe) order_id: string,
    @Body() changeOrderStatusDto: ChangeOrderStatusDto,
  ) {
    return this.ordersClient
      .send(
        { cmd: OrderTCP.CHANGE_ORDER_STATUS },
        { order_id: order_id, status: changeOrderStatusDto.status },
      )
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }
}
