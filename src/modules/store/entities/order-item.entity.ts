import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { Order } from "src/modules/store/entities/order.entity";
import { Product } from "src/modules/store/entities/product.entity";

@Entity({
    name: 'orderItem'
})

export class OrderItem {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Order, (o) => o.items)
    order: Order;

    @ManyToOne(() => Product, (p) => p)
    product: Product;

    @Column('decimal')
    price: number;

    @Column('decimal')
    quantity: number;
}