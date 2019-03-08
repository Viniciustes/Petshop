import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "src/modules/store/entities/product.entity";


@Injectable()
export class ProductService {

    constructor(
        @InjectRepository(Product)
        private readonly repository: Repository<Product>
    ) { }

    async findAll(): Promise<Product[]> {
        return await this.repository.find();
    }

    async getById(id: number): Promise<Product> {
        return await this.repository.findOne({ id: id });
    }

    async save(product: Product) {
        await this.repository.save(product);
    }

    async update(id: number, product: Product) {
        await this.repository.update(id, product);
    }

    async delete(id: number) {
        await this.repository.delete(id);
    }
}