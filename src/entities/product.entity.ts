import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { ProductImage } from './product-image.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  product_id: Number;

  @Column()
  product_name: string;

  @CreateDateColumn()
  create_at: Date;

  @UpdateDateColumn({
    nullable: true,
  })
  update_at: Date;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @OneToMany(() => ProductImage, (img) => img.product)
  imgs : ProductImage[];
}
