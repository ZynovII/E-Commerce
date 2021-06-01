import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItemEntity } from './cart-item.entity';
import { CartItemRepository } from './cart-item.repository';
import { CreateCartItemDto } from './dto/create-cart-item.dto';

@Injectable()
export class CartItemService {
  constructor(
    @InjectRepository(CartItemRepository)
    private cartItemRepository: CartItemRepository,
  ) {}

  async getCartItemById(id: string): Promise<CartItemEntity> {
    const found = await this.cartItemRepository.findOne({ id });
    if (!found) {
      throw new NotFoundException('Cart-item not found');
    }
    return found;
  }

  async updateCartItemQuantity(
    id: string,
    quantity: number,
  ): Promise<CartItemEntity> {
    const cartItem = await this.getCartItemById(id);
    cartItem.quantity = quantity;
    await this.cartItemRepository.save(cartItem);
    return cartItem;
  }

  async createCartItem(
    createCartItemDto: CreateCartItemDto,
  ): Promise<CartItemEntity> {
    return this.cartItemRepository.createCartItem(createCartItemDto);
  }
}
