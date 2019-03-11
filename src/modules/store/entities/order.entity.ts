import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from 'typeorm';
import { OrderItem } from 'src/modules/store/entities/order-item.entity';

@Entity({
    name: 'order',
})

export class Order {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 8 })
    number: string;

    @Column('datetime')
    date: Date;

    @Column({ length: 11 })
    customer: string;

    @OneToMany(() => OrderItem, (oi) => oi.order)
    items: OrderItem[];
}
