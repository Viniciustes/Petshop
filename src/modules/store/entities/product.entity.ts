import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
    name: 'product'
})
export class Product {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 80, nullable: true })
    title: string;

    @Column({ length: 250, nullable: true })
    description: string;

    @Column('decimal')
    price: number;

    @Column('decimal')
    quantityOnHand: number;
}