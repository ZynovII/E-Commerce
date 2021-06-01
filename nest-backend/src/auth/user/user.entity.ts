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
import { ApiProperty } from '@nestjs/swagger';

@Entity('user')
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Nick', description: 'First Name' })
  @Column()
  firstName: string;

  @ApiProperty({ example: 'Smith', description: 'Last Name' })
  @Column()
  lastName: string;

  @ApiProperty({ example: 'ADMIN', description: 'User Role' })
  @Column()
  role: UserRoles;

  @ApiProperty({ example: '???', description: 'Avatar img' })
  @Column({ default: '' })
  avatar: string;

  @ApiProperty({ example: 'fake@test.com', description: 'User email' })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ example: '1PassWord10', description: 'Password' })
  @Column()
  password: string;

  @ApiProperty({ example: 'LIGHT', description: 'Choosen layout theme' })
  @Column()
  theme: LayoutThemes;

  @ApiProperty({ example: 'true', description: 'Is notifications allowed' })
  @Column()
  allowNotification: boolean;

  @OneToMany((_type) => CartItemEntity, (cartItem) => cartItem.user, {
    eager: true,
  })
  cartItems: CartItemEntity[];
}
