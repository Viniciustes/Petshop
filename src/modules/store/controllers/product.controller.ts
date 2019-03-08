import { Controller, Get, HttpException, HttpStatus, Post, Body, Put, Param, Delete } from "@nestjs/common";
import { ProductService } from "src/modules/store/services/product.service";
import { Result } from "src/modules/backoffice/models/result.model";
import { Product } from "src/modules/store/entities/product.entity";


@Controller('v1/products')
export class ProductController {
    constructor(
        private readonly service: ProductService
    ) { }

    @Get()
    async findAll() {
        try {
            const products = await this.service.findAll()

            return new Result('Produtos obtidos com sucesso!', true, products, null);

        } catch (error) {
            this.error(error);
        }
    }

    @Post()
    async save(@Body() product: Product) {
        try {
            await this.service.save(product);

            return new Result('Produto cadastrado com sucesso!', true, product, null);

        } catch (error) {
            this.error(error);
        }
    }

    @Put(':id')
    async update(@Param('id') id, @Body() product: Product) {
        try {
            await this.service.update(id, product);

            return new Result('Produto alterado com sucesso!', true, product, null);

        } catch (error) {
            this.error(error);
        }
    }

    @Delete(':id')
    async delete(@Param('id') id) {
        try {
            await this.service.delete(id);

            return new Result('Produto excluído com sucesso!', true, id, null);
        } catch (error) {
            this.error(error);
        }
    }

    error(error: any) {
        throw new HttpException(new Result('Não foi possível realizar a transação!', false, null, error), HttpStatus.BAD_REQUEST);
    }
}