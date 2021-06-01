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
import { UpdateProductAvailabilityDto } from './dto/update-product-availability.dto';
import { ProductEntity } from './product.entity';
import { ProductService } from './product.service';

@Controller('products')
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
  //FIXME: change to admin only
  @UseGuards(AuthGuard())
  createProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<ProductEntity> {
    return this.productService.createProduct(createProductDto);
  }

  @Patch('/:id/availability')
  //FIXME: change to admin only
  @UseGuards(AuthGuard())
  updateAvailability(
    @Param('id') id: string,
    @Body() updateProductAvailabilityDto: UpdateProductAvailabilityDto,
  ): Promise<ProductEntity> {
    const { isAvailable } = updateProductAvailabilityDto;
    return this.productService.updateAvailability(id, isAvailable);
  }

  @Delete('/:id')
  //FIXME: change to admin only
  @UseGuards(AuthGuard())
  deleteProduct(@Param('id') id: string): Promise<string> {
    return this.productService.deleteProduct(id);
  }
}
