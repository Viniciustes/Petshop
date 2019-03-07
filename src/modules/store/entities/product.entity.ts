import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
    name: 'product'
})
export class Product {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 80 })
    title: string;

    @Column('text')
    description: string;
}