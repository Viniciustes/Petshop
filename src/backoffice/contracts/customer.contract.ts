import { Contract } from './contract';
import { Flunt } from 'src/utils/flunt';
import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from '../dtos/create-customer-dto';

@Injectable()
export class CreateCustomerContract implements Contract {
    errors: string[];

    validate(model: CreateCustomerDto): boolean {
        const flunt = new Flunt();

        flunt.isEmail(model.email, 'Email inválido!');
        flunt.isFixedLen(model.document, 11, 'CPF inválido!');
        flunt.hasMinLen(model.password, 6, "Senha inválida.");
        flunt.hasMinLen(model.name, 5, 'Nome inválido! Deve ter no minimo 5 caracteres.');

        this.errors = flunt.errors;

        return flunt.isValid();
    }
}