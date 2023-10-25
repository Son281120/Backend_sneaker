import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  category_id: number;

  @Column()
  category_name: string;

  @Column()
  category_thumbnail: string;

  @CreateDateColumn()
  create_at: Date;

  @UpdateDateColumn({
    nullable: true,
  })
  update_at: Date;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
