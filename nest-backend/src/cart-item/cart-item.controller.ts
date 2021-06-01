import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CartItemEntity } from './cart-item.entity';
import { CartItemService } from './cart-item.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';

@ApiTags('Cart-item')
@Controller('cart-item')
export class CartItemController {
  constructor(private cartItemService: CartItemService) {}

  @Get('/:id')
  getCartItemById(@Param('id') id: string): Promise<CartItemEntity> {
    return this.cartItemService.getCartItemById(id);
  }

  @Patch('/:id/quantity')
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
