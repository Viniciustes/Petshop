import { Injectable } from '@nestjs/common';
import { Flunt } from 'src/utils/flunt';
import { Contract } from 'src/modules/backoffice/contracts/contract';
import { CreditCard } from 'src/modules/backoffice/models/credit-cart.model';

@Injectable()
export class CreateCreditCardContract implements Contract {
    errors: string[];

    validate(model: CreditCard): boolean {
        const flunt = new Flunt();

        flunt.hasMinLen(model.holder, 5, 'Nome no cartão inválido!');
        flunt.isFixedLen(model.number, 16, 'Número do cartão inválido!');
        flunt.isFixedLen(model.expiration, 4, 'Data de expiração do cartão inválido!');

        this.errors = flunt.errors;

        return flunt.isValid();
    }
}
