import { IsIn, IsNotEmpty } from 'class-validator';
import { OrderStatus } from '../enums';

export class ChangeOrderStatusDto {
  @IsNotEmpty()
  @IsIn([OrderStatus.CANCELLED, OrderStatus.DELIVERED, OrderStatus.PENDING])
  status: OrderStatus;
}
