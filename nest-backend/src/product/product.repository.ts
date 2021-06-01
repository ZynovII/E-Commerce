import { EntityRepository, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { GetProductsFilterDto } from './dto/get-products-filter.dto';
import { ProductEntity } from './product.entity';

@EntityRepository(ProductEntity)
export class ProductRepository extends Repository<ProductEntity> {
  async getProducts(filterDto: GetProductsFilterDto): Promise<ProductEntity[]> {
    const { isAvailable, search } = filterDto;
    const query = this.createQueryBuilder('product');

    if (isAvailable) {
      query.andWhere('product.isAvailable = :isAvailable', { isAvailable });
    }
    if (search) {
      query.andWhere(
        '(LOWER(product.name) LIKE LOWER(:search) OR LOWER(product.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }
    const products = await query.getMany();
    return products;
  }

  async createProduct(
    createProductDto: CreateProductDto,
  ): Promise<ProductEntity> {
    const {
      name,
      description,
      quantity,
      price,
      category,
      params,
      images,
    } = createProductDto;
    const product = this.create({
      name,
      description,
      quantity,
      price,
      params,
      category,
      images,
      raiting: 0,
      isAvailable: false,
    });
    await this.save(product);
    return product;
  }
}
