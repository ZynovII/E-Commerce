import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateProductDto } from './dto/create-product.dto';
import { GetProductsFilterDto } from './dto/get-products-filter.dto';
import { ProductEntity } from './product.entity';
import { ProductService } from './product.service';

@Controller('products')
@UseGuards(AuthGuard())
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  getProducts(
    @Query() filterDto: GetProductsFilterDto,
  ): Promise<ProductEntity[]> {
    return this.productService.getProducts(filterDto);
  }

  @Get('/:id')
  getProductById(@Param('id') id: string): Promise<ProductEntity> {
    return this.productService.getProductById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<ProductEntity> {
    return this.productService.createProduct(createProductDto);
  }

  @Patch('/:id/availability')
  updateAvailability(
    @Param('id') id: string,
    @Body() status: boolean,
  ): Promise<ProductEntity> {
    return this.productService.updateAvailability(id, status);
  }

  @Delete('/:id')
  deleteProduct(@Param('id') id: string): Promise<string> {
    return this.productService.deleteProduct(id);
  }
}
