import { Controller, Get, Post, Put, Delete, Param, Body, UseInterceptors, HttpException, HttpStatus } from '@nestjs/common';
import { User } from 'src/modules/backoffice/models/user.model';
import { QueryDto } from 'src/modules/backoffice/dtos/Query/query.dto';
import { Result } from 'src/modules/backoffice/models/result.model';
import { Customer } from 'src/modules/backoffice/models/customer.model';
import { ValidatorInterceptor } from 'src/interceptors/validator.interceptor';
import { AccountService } from 'src/modules/backoffice/services/account.service';
import { CustomerService } from 'src/modules/backoffice/services/customer.service';
import { CreateCustomerDto } from 'src/modules/backoffice/dtos/Customer/create-customer.dto';
import { GetQueryContract } from 'src/modules/backoffice/contracts/query/get-query.contract';
import { CreateCustomerContract } from 'src/modules/backoffice/contracts/customer/create-customer.contract';
import { UpdateCustomerContract } from 'src/modules/backoffice/contracts/customer/update-customer.contract';
import { UpdateCustomerDto } from 'src/modules/backoffice/dtos/Customer/update-customer.dto';

@Controller('v1/customers')
export class CustomerController {

    constructor(
        private readonly service: CustomerService,
        private readonly accountService: AccountService
    ) { }

    @Post()
    @UseInterceptors(new ValidatorInterceptor(new CreateCustomerContract()))
    async create(@Body() model: CreateCustomerDto) {
        try {
            const user = await this.accountService.create(
                new User(model.document, model.password, true)
            );

            const customer = await this.service.create(
                new Customer(model.name, model.document, model.email, [], null, null, null, user)
            );

            return new Result('Cliente criado com sucesso!', true, customer, null);

        } catch (error) {
            this.error(error);
        }
    }

    @Post('query')
    @UseInterceptors(new ValidatorInterceptor(new GetQueryContract()))
    async query(@Body() model: QueryDto) {
        try {
            const customers = await this.service.query(model);

            return new Result('Dados obtidos com sucesso', true, customers, null);

        } catch (error) {
            this.error(error);
        }
    }

    @Get()
    async findAll() {
        try {
            const customers = await this.service.findAll()

            return new Result('Clientes obtidos com sucesso!', true, customers, null);

        } catch (error) {
            this.error(error);
        }
    }

    @Get(':document')
    async findById(@Param('document') document) {
        try {
            const customer = await this.service.findById(document);

            return new Result('Cliente obtido com sucesso!', true, customer, null);

        } catch (error) {
            this.error(error);
        }
    }

    @Put(':document')
    @UseInterceptors(new ValidatorInterceptor(new UpdateCustomerContract()))
    async update(@Param('document') document, @Body() model: UpdateCustomerDto) {
        try {
            var customer = new Customer(model.name, null, null, null, null, null, null, null);

            await this.service.update(document, customer);

            return new Result('Cliente alterado com sucesso!', true, model, null);

        } catch (error) {
            this.error(error);
        }
    }

    @Delete()
    delete(@Body() customer: Customer) {
        return new Result('Cliente excluído com sucesso!', true, customer, null);
    }

    error(error: any) {
        throw new HttpException(new Result('Não foi possível realizar a transação!', false, null, error), HttpStatus.BAD_REQUEST);
    }
}