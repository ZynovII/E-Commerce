import { User } from 'src/auth/user/user.entity';
import { ProductEntity } from 'src/product/product.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

//FIXME: config fields
@Entity('cart-item')
export class CartItemEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  productId: string;

  @Column()
  quantity: number;

  @ManyToOne((_type) => User, (user) => user.cartItems, { eager: false })
  user: User;

  @OneToOne((_type) => ProductEntity, (product) => product.cartItem, {
    eager: true,
  })
  product: ProductEntity;
}
