import { Controller, Get, Param, HttpException, HttpStatus, Post, Body } from "@nestjs/common";
import { OrderService } from "src/modules/store/services/order.service";
import { ProductService } from "src/modules/store/services/product.service";
import { OrderItemService } from "src/modules/store/services/order-item.service";
import { Result } from "src/modules/backoffice/models/result.model";
import { OrderItemDto } from "src/modules/store/dtos/order-item.dto";
import { Order } from "../entities/order.entity";
import { OrderItem } from "../entities/order-item.entity";


@Controller('v1/orders')
export class OrderController {
    constructor(
        private readonly service: OrderService,
        private readonly productService: ProductService,
        private readonly orderItemService: OrderItemService
    ) { }

    @Get(':number')
    async getByNumber(@Param('number') number: string) {
        try {
            const order = await this.service.getByNumber(number);

            return new Result('Pedido obtido com sucesso!', true, order, null);

        } catch (error) {
            this.error(error);
        }
    }

    @Get(':customer')
    async getByCustomer(@Param('customer') customer: string) {
        try {
            const orders = await this.service.getByCustomer(customer);

            return new Result('Pedidos obtidos com sucesso!', true, orders, null);

        } catch (error) {
            this.error(error);
        }
    }

    @Post()
    async post(@Body() model: OrderItemDto[]) {
        try {
            let order = new Order();
            order.customer = '12345678912'; // vai vim do Token (jwt)
            order.date = new Date();
            order.number = '1B2D3D8R';
            order.items = [];

            await this.service.save(order);

            for (const item of model) {
                let product = await this.productService.getById(item.product);
                let orderItem = new OrderItem();
                orderItem.order = order;
                orderItem.product = product;
                orderItem.price = product.price;
                orderItem.quantity = item.quantity;

                await this.orderItemService.save(orderItem);
            }

        } catch (error) {
            this.error(error);
        }
    }

    error(error: any) {
        throw new HttpException(new Result('Não foi possível realizar a transação!', false, null, error), HttpStatus.BAD_REQUEST);
    }
}