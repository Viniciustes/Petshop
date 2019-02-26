import { Controller, Get, Post, Put, Delete, Param, Body, UseInterceptors } from '@nestjs/common';
import { Customer } from '../models/customer.model';
import { Result } from '../models/result.model';
import { ValidatorInterceptor } from 'src/interceptors/validator.interceptor';
import { CreateCustomerContract } from '../contracts/customer.contract';
import { CreateCustomerDto } from '../dtos/create-customer-dto';
import { AccountService } from '../services/account.service';
import { User } from '../models/user.model';

@Controller('v1/customers')
export class CustomerController {

    constructor(private readonly accountService: AccountService) { }

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
    async post(@Body() customer: CreateCustomerDto) {

        const user = await this.accountService.create(
            new User(customer.document, customer.password, true)
        );

        return new Result('Cliente criado com sucesso!', true, user, null);
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