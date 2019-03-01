import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { AccountService } from './services/account.service';
import { CustomerSchema } from './schemas/customer.schema';
import { CustomerService } from './services/customer.service';
import { CustomerController } from './controllers/customer.controller';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'Customer',
                schema: CustomerSchema
            },
            {
                name: 'User',
                schema: UserSchema
            }
        ])],
    controllers: [CustomerController],
    providers: [AccountService, CustomerService]
})
export class BackofficeModule { }
