import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pet } from 'src/modules/backoffice/models/pet.model';
import { Customer } from 'src/modules/backoffice/models/customer.model';

@Injectable()
export class PetService {
    constructor(@InjectModel('Customer') private readonly model: Model<Customer>) { }

    async create(document: string, data: Pet): Promise<Customer> {
        const options = { new: true };

        return await this.model
            .findOneAndUpdate({ document }, {
                $push: {
                    pets: data,
                },
            }, options);
    }

    async update(document: string, idPet: string, data: Pet): Promise<Customer> {

        return await this.model
            .findOneAndUpdate({ document, 'pets._id': idPet }, {
                $set: {
                    'pets.$': data,
                },
            });
    }
}
