import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItemController } from './cart-item.controller';
import { CartItemRepository } from './cart-item.repository';
import { CartItemService } from './cart-item.service';

@Module({
  imports: [TypeOrmModule.forFeature([CartItemRepository])],
  controllers: [CartItemController],
  providers: [CartItemService],
})
export class CartItemModule {}
