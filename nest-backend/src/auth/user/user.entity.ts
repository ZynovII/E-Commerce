import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { UserRoles } from 'src/auth/user/models/UserRoles';
import { LayoutThemes } from 'src/auth/user/models/LayoutThemes';
import { CartItemEntity } from 'src/cart-item/cart-item.entity';
import { CartItemService } from 'src/cart-item/cart-item.service';

@Entity('user')
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  role: UserRoles;

  @Column({ default: '' })
  avatar: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @Column()
  theme: LayoutThemes;

  @Column()
  allowNotification: boolean;

  @OneToMany((_type) => CartItemEntity, (cartItem) => cartItem.user, {
    eager: true,
  })
  cartItems: CartItemEntity[];
}
