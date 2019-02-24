import { Controller, Get, Post, Put, Delete, Param, Body, UseInterceptors } from '@nestjs/common';
import { Customer } from '../models/customer.model';
import { Result } from '../models/result.model';
import { ValidatorInterceptor } from 'src/interceptors/validator.interceptor';
import { CreateCustomerContract } from '../contracts/customer.contract';
import { CreateCustomerDto } from '../dtos/create-customer-dto';

@Controller('v1/customers')
export class CustomerController {
    @Get()
    get() {
        return new Result(null, true, [], null);
    }

    @Get(':document')
    getById(@Param('document') document: string) {
        return new Result(null, true, {}, null);
    }

    @Post()
    @UseInterceptors(new ValidatorInterceptor(new CreateCustomerContract()))
    post(@Body() customer: CreateCustomerDto) {
        return new Result('Cliente cadastrado com sucesso!', true, customer, null);
    }

    @Put(':document')
    put(@Param('document') document, @Body() customer: Customer) {
        return new Result('Cliente alterado com sucesso!', true, customer, null);
    }

    @Delete()
    delete(@Body() customer: Customer) {
        return new Result('Cliente excluído com sucesso!', true, customer, null);
    }
}