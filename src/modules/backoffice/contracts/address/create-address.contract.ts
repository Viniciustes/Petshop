import { Injectable } from '@nestjs/common';
import { Flunt } from 'src/utils/flunt';
import { Contract } from 'src/modules/backoffice/contracts/contract';
import { CreateAddressDto } from 'src/modules/backoffice/dtos/Address/create-address.dto';

@Injectable()
export class CreateAddressContract implements Contract {
    errors: string[];

    validate(model: CreateAddressDto): boolean {
        const flunt = new Flunt();

        flunt.isFixedLen(model.zipCode, 8, 'CEP inválido');
        flunt.hasMinLen(model.street, 3, 'Endereço inválido');
        flunt.isFixedLen(model.state, 2, 'Estado  inválido');

        this.errors = flunt.errors;

        return flunt.isValid();
    }
}
