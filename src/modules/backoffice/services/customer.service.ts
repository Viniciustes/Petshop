import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QueryDto } from 'src/modules/backoffice/dtos/Query/query.dto';
import { Customer } from 'src/modules/backoffice/models/customer.model';

@Injectable()
export class CustomerService {
    constructor(@InjectModel('Customer') private readonly model: Model<Customer>) { }

    async create(data: Customer): Promise<Customer> {
        const customer = new this.model(data);
        return await customer.save();
    }

    async update(document: string, data: Customer): Promise<Customer> {
        return await this.model
            .findOneAndUpdate({ document },
                {
                    name: data.name
                });
    }

    async findAll(): Promise<Customer[]> {
        return await this.model
            .find({}, 'name email document')
            .sort('document')
            .exec();
    }

    async findById(document: string): Promise<Customer> {
        return await this.model
            .findOne({ document })
            .populate('user', '-password')
            .exec();
    }

    async delete(id: number) {
        await this.model.delete(id);
    }

    async query(query: QueryDto): Promise<Customer[]> {
        return await this.model
            .find(query.query, query.fields, { skip: query.skip, limit: query.take })
            .sort(query.sort)
            .exec();
    }
}