import { ProductEntity } from 'src/product/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('manufacturer')
export class ManufacturerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany((_type) => ProductEntity, (product) => product.manufacturer, {
    eager: false,
  })
  products: ProductEntity[];
}
