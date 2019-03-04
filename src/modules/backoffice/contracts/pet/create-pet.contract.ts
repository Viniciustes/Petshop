import { Injectable } from '@nestjs/common';
import { Flunt } from 'src/utils/flunt';
import { Contract } from 'src/modules/backoffice/contracts/contract';
import { CreatePetsDto } from 'src/modules/backoffice/dtos/Pet/create-pets.dto';

@Injectable()
export class CreatePetsContract implements Contract {
    errors: string[];

    validate(model: CreatePetsDto): boolean {
        const flunt = new Flunt();

        flunt.hasMinLen(model.name, 2, 'Nome inválido');
        flunt.hasMinLen(model.gender, 3, 'Gênero inválido');
        flunt.hasMinLen(model.kind, 3, 'Tipo inválido');
        flunt.hasMinLen(model.brand, 3, 'Raça inválida');

        this.errors = flunt.errors;

        return flunt.isValid();
    }
}