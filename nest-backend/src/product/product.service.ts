import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DELETE_SUCCESS } from 'src/constants/text.constant';
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

  async getProductById(id: string): Promise<ProductEntity> {
    const found = await this.productRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Product not found`);
    }
    return found;
  }

  createProduct(createProductDto: CreateProductDto): Promise<ProductEntity> {
    return this.productRepository.createProduct(createProductDto);
  }

  async updateAvailability(
    id: string,
    isAvailable: boolean,
  ): Promise<ProductEntity> {
    const product = await this.getProductById(id);
    product.isAvailable = isAvailable;
    await this.productRepository.save(product);
    return product;
  }

  async deleteProduct(id: string): Promise<string> {
    const result = await this.productRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Product not found`);
    }
    return DELETE_SUCCESS;
  }
}
