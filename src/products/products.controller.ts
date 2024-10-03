import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { MicroservicesEnum, ProductTCP } from 'src/common/constants';
import { CreateProductDto, SearchProductByDto, UpdateProductDto } from './dtos';
import { catchError } from 'rxjs';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(MicroservicesEnum.PRODUCT_MS)
    private readonly productsClient: ClientProxy,
  ) {}

  @Post('')
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsClient
      .send({ cmd: ProductTCP.CREATE_PRODUCT }, createProductDto)
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }

  @Get('')
  findProducts(@Query() searchProductByDto: SearchProductByDto) {
    return this.productsClient
      .send({ cmd: ProductTCP.FIND_PRODUCTS }, searchProductByDto)
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }

  @Get(':product_id')
  async findProduct(@Param('product_id', ParseUUIDPipe) product_id: string) {
    // USANDO PROMESAS
    // try {
    //   const product = await firstValueFrom(this.productsClient.send({ cmd: ProductTCP.FIND_PRODUCT }, { product_id: product_id }));
    //   return product;
    // } catch (error) {
    //   throw new RpcException(error);
    // }

    // USANDO OBSERVABLES
    return this.productsClient
      .send({ cmd: ProductTCP.FIND_PRODUCT }, { product_id: product_id })
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }

  @Patch(':product_id')
  editProduct(
    @Param('product_id', ParseUUIDPipe) product_id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsClient
      .send(
        { cmd: ProductTCP.EDIT_PRODUCT },
        { ...updateProductDto, product_id: product_id },
      )
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }

  @Delete(':product_id')
  deleteProduct(@Param('product_id', ParseUUIDPipe) product_id: string) {
    return this.productsClient
      .send({ cmd: ProductTCP.DELETE_PRODUCT }, { product_id: product_id })
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }

  @Delete(':product_id/images/:product_image_id')
  deleteProductImage(
    @Param('product_id', ParseUUIDPipe) product_id: string,
    @Param('product_image_id', ParseUUIDPipe) product_image_id: string,
  ) {
    return this.productsClient
      .send(
        { cmd: ProductTCP.DELETE_PRODUCT_IMAGE },
        { product_id, product_image_id },
      )
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }
}
