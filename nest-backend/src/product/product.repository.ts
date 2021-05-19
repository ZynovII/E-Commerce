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
        '(product.name LIKE :search OR product.description LIKE :search)',
        { search: `%${search}%` },
      );
    }

    const products = await query.getMany();
    return products;
  }

  async createProduct(
    createProductDto: CreateProductDto,
  ): Promise<ProductEntity> {
    const { name, description, quantity, price } = createProductDto;

    const product: ProductEntity = new ProductEntity();
    product.name = name;
    product.description = description;
    product.quantity = quantity;
    product.price = price;
    product.raiting = 0;
    product.isAvailable = false;
    await product.save();

    return product;
  }
}
