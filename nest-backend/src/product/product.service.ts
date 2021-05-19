import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { GetProductsFilterDto } from './dto/get-products-filter.dto';
import { ProductEntity } from './product.entity';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
  ) {}
  async getProducts(filterDto: GetProductsFilterDto): Promise<ProductEntity[]> {
    return this.productRepository.getProducts(filterDto);
  }
  async getProductById(id: number): Promise<ProductEntity> {
    const found = await this.productRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return found;
  }
  createProduct(createProductDto: CreateProductDto): Promise<ProductEntity> {
    return this.productRepository.createProduct(createProductDto);
  }
  async updateAvailability(
    id: number,
    status: boolean,
  ): Promise<ProductEntity> {
    const product = await this.getProductById(id);
    product.isAvailable = status;
    await product.save();
    return product;
  }
  async deleteProduct(id: number): Promise<string> {
    const result = await this.productRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return 'Successfully deleted';
  }
}
