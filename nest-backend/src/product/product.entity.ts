import { CartItemEntity } from 'src/cart-item/cart-item.entity';
import { ManufacturerEntity } from 'src/manufacturer/manufacturer.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('product')
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @Column()
  raiting: number;

  @Column()
  isAvailable: boolean;

  //FIXME: reconfig fields below
  @Column()
  category: string;

  @Column()
  params: string;

  @Column()
  images: string;

  @ManyToOne(
    (_type) => ManufacturerEntity,
    (manufacturer) => manufacturer.products,
    { eager: true },
  )
  manufacturer: ManufacturerEntity;

  @OneToMany((_type) => CartItemEntity, (cartItem) => cartItem.product, {
    eager: false,
  })
  cartItem: CartItemEntity[];
}
