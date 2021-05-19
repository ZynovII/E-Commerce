import { BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm';

export class ProductEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

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
}
