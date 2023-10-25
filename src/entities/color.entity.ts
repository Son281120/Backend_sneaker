import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class Color {
  @PrimaryGeneratedColumn()
  color_id: number;

  @Column()
  color_name: string;

  @ManyToMany(() => Product)
  @JoinTable()
  products: Product[];
}
