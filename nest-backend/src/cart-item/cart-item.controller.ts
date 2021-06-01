import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CartItemEntity } from './cart-item.entity';
import { CartItemService } from './cart-item.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';

@Controller('cart-item')
export class CartItemController {
  constructor(private cartItemService: CartItemService) {}

  @Get('/:id')
  getCartItemById(@Param('id') id: string): Promise<CartItemEntity> {
    return this.cartItemService.getCartItemById(id);
  }

  @Put('/:id/quantity')
  updateQuantity(
    @Param('id') id: string,
    @Body() quantity: number,
  ): Promise<CartItemEntity> {
    return this.cartItemService.updateCartItemQuantity(id, quantity);
  }

  @Post()
  createCartItem(
    @Body() createCartItemDto: CreateCartItemDto,
  ): Promise<CartItemEntity> {
    return this.cartItemService.createCartItem(createCartItemDto);
  }
}
