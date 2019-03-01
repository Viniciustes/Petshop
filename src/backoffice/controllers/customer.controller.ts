import { User } from '../models/user.model';
import { Result } from '../models/result.model';
import { Customer } from '../models/customer.model';
import { AccountService } from '../services/account.service';
import { CustomerService } from '../services/customer.service';
import { CreateCustomerDto } from '../dtos/create-customer-dto';
import { CreateCustomerContract } from '../contracts/customer.contract';
import { ValidatorInterceptor } from 'src/interceptors/validator.interceptor';
import { Controller, Get, Post, Put, Delete, Param, Body, UseInterceptors, HttpException, HttpStatus } from '@nestjs/common';

@Controller('v1/customers')
export class CustomerController {

    constructor(
        private readonly accountService: AccountService,
        private readonly customerService: CustomerService
    ) { }

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
    async post(@Body() model: CreateCustomerDto) {
        try {
            const user = await this.accountService.create(
                new User(model.document, model.password, true)
            );

            const customer = await this.customerService.create(
                new Customer(model.name, model.document, model.email, null, null, null, null, user)
            );

            return new Result('Cliente criado com sucesso!', true, customer, null);

        } catch (error) {
            throw new HttpException(new Result('Não foi possível realizar a transação', false, null, error), HttpStatus.BAD_REQUEST);
        }
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