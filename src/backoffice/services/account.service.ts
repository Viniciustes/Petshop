import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { User } from '../models/user.model';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AccountService {
    constructor(@InjectModel('User') private readonly model: Model<User>) { }

    async create(user: User): Promise<User> {
        const usr = new this.model(user);
        return await usr.save();
    }
}