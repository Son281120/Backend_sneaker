import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({
    length: 50,
  })
  user_name: string;

  @Column({
    length: 100,
    nullable: true,
  })
  avatar: string;

  @Column({
    length: 12,
    nullable: true,
  })
  phone_number: string;

  @Column({
    length: 50,
    unique: true,
  })
  email: string;

  @Column({
    length: 100,
    nullable: true,
  })
  address: string;

  @Column({
    nullable: true,
  })
  old: number;

  @Column({
    length: 100,
  })
  password: string;

  @CreateDateColumn({
    name: 'created_at',
    nullable: true,
  })
  create_at: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    nullable: true,
  })
  update_at: Date;

  @Column({
    nullable: true,
  })
  refresh_token: string;

  @Column({
    type: 'enum',
    enum: ['admin', 'customer'],
    default: 'customer',
  })
  roles: string;
}
