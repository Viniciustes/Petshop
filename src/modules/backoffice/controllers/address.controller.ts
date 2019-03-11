import { Controller, Post, UseInterceptors, HttpException, HttpStatus, Param, Body } from '@nestjs/common';
import { ValidatorInterceptor } from 'src/interceptors/validator.interceptor';
import { CreateAddressContract } from 'src/modules/backoffice/contracts/address/create-address.contract';
import { Result } from 'src/modules/backoffice/models/result.model';
import { CreateAddressDto } from 'src/modules/backoffice/dtos/Address/create-address.dto';
import { Address } from 'src/modules/backoffice/models/address.model';
import { AddressService } from 'src/modules/backoffice/services/address.service';
import { AddressType } from 'src/modules/backoffice/enums/address-type.enum';

@Controller('v1/addresses')
export class AddressController {

    constructor(
        private readonly service: AddressService,
    ) { }

    @Post(':document/billing')
    @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
    async createBilling(@Param('document') document, @Body() model: CreateAddressDto) {
        try {
            const address = new Address(model.zipCode, model.street, model.number, 
                model.complement, model.neighborhood, model.city, model.state, model.country);

            await this.service.create(document, address, AddressType.Billing);

            return new Result('Endereço de cobrança atualizado com sucesso!', true, model, null);

        } catch (error) {
            this.error(error);
        }
    }

    @Post(':document/shipping')
    @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
    async createShipping(@Param('document') document, @Body() model: CreateAddressDto) {
        try {
            const address = new Address(model.zipCode, model.street, model.number, 
                model.complement, model.neighborhood, model.city, model.state, model.country);

            await this.service.create(document, address, AddressType.Shipping);

            return new Result('Endereço de entrega atualizado com sucesso!', true, model, null);

        } catch (error) {
            this.error(error);
        }
    }

    error(error: any) {
        throw new HttpException(new Result('Não foi possível realizar a transação!', false, null, error), HttpStatus.BAD_REQUEST);
    }
}
