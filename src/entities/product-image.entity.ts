import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class ProductImage {
  @PrimaryGeneratedColumn()
  img_id: number;

  @Column()
  img_url: string;

  @ManyToOne(() => Product, (product) => product.imgs)
  product: Product;
}
