import { User } from '../models/user.model';
import { Result } from '../models/result.model';
import { Address } from '../models/address.model';
import { Customer } from '../models/customer.model';
import { AccountService } from '../services/account.service';
import { CreateAddressDto } from '../dtos/create-address-dto';
import { CustomerService } from '../services/customer.service';
import { CreateCustomerDto } from '../dtos/create-customer-dto';
import { ValidatorInterceptor } from 'src/interceptors/validator.interceptor';
import { CreateAddressContract } from '../contracts/customer/create-address.contract';
import { CreateCustomerContract } from '../contracts/customer/create-customer.contract';
import { Controller, Get, Post, Put, Delete, Param, Body, UseInterceptors, HttpException, HttpStatus } from '@nestjs/common';

@Controller('v1/customers')
export class CustomerController {

    constructor(
        private readonly accountService: AccountService,
        private readonly customerService: CustomerService
    ) { }

    @Post()
    @UseInterceptors(new ValidatorInterceptor(new CreateCustomerContract()))
    async post(@Body() model: CreateCustomerDto) {
        try {
            const user = await this.accountService.create(
                new User(model.document, model.password, true)
            );

            const customer = await this.customerService.create(
                new Customer(model.name, model.document, model.email, [], null, null, null, user)
            );

            return new Result('Cliente criado com sucesso!', true, customer, null);

        } catch (error) {
            error(error);
        }
    }

    @Post(':document/addresses/billing')
    @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
    async addBillingAddress(@Param('document') document, @Body() model: CreateAddressDto) {
        try {
            const address = new Address(model.zipCode, model.street, model.number, model.complement, model.neighborhood, model.city, model.state, model.country);

            await this.customerService.addBillingAddress(document, address);

            return new Result('Endereço de cobrança atualizado com sucesso', true, model, null);

        } catch (error) {
            error(error);
        }
    }

    @Post(':document/addresses/shipping')
    @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
    async addShippingAddress(@Param('document') document, @Body() model: CreateAddressDto) {
        try {
            const address = new Address(model.zipCode, model.street, model.number, model.complement, model.neighborhood, model.city, model.state, model.country);

            await this.customerService.addShippingAddress(document, address);

            return new Result('Endereço de entrega atualizado com sucesso', true, model, null);

        } catch (error) {
            error(error);
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

    error(error: any) {
        throw new HttpException(new Result('Não foi possível realizar a transação', false, null, error), HttpStatus.BAD_REQUEST);
    }
}