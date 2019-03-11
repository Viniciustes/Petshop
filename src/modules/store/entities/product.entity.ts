import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
    name: 'product',
})
export class Product {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 80, nullable: true })
    title: string;

    @Column({ length: 250, nullable: true })
    description: string;

    @Column({ nullable: true, default: 0 })
    price: number;

    @Column({ nullable: true, default: 0 })
    quantityOnHand: number;
}
