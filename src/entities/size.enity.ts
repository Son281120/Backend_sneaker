import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Size {
    @PrimaryGeneratedColumn()
    size_id: number;

    @Column()
    size: string;
}