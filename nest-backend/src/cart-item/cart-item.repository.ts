import { EntityRepository, Repository } from 'typeorm';
import { CartItemEntity } from './cart-item.entity';
import { CreateCartItemDto } from './dto/create-cart-item.dto';

@EntityRepository(CartItemEntity)
export class CartItemRepository extends Repository<CartItemEntity> {
  async createCartItem(
    createCartItemDto: CreateCartItemDto,
  ): Promise<CartItemEntity> {
    const cartItem = this.create({ ...createCartItemDto });
    await this.save(cartItem);
    return cartItem;
  }
}
