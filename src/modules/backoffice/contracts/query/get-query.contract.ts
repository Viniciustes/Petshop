import { Injectable } from '@nestjs/common';
import { Flunt } from 'src/utils/flunt';
import { Contract } from 'src/modules/backoffice/contracts/contract';
import { QueryDto } from 'src/modules/backoffice/dtos/Query/query.dto';

@Injectable()
export class GetQueryContract implements Contract {
    errors: string[];

    validate(model: QueryDto): boolean {
        const flunt = new Flunt();

        if (!model.query)
            model.query = {}

        flunt.isGreaterThan(model.take, 25, 'Busca não pode exceder o máximo de 25 registros.');

        this.errors = flunt.errors;

        return flunt.isValid();
    }
}