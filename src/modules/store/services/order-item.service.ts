import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItem } from 'src/modules/store/entities/order-item.entity';

@Injectable()
export class OrderItemService {

    constructor(
        @InjectRepository(OrderItem)
        private readonly repository: Repository<OrderItem>,
    ) { }

    async save(orderItem: OrderItem) {
        await this.repository.save(orderItem);
    }
}
