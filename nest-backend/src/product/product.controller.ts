import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
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
  getProductById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ProductEntity> {
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
    @Param('id', ParseIntPipe) id: number,
    @Body() status: boolean,
  ): Promise<ProductEntity> {
    return this.productService.updateAvailability(id, status);
  }

  @Delete('/:id')
  deleteProduct(@Param('id', ParseIntPipe) id: number): Promise<string> {
    return this.productService.deleteProduct(id);
  }
}
