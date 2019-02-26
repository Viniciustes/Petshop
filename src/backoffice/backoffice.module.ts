import { Module } from '@nestjs/common';
import { CustomerController } from './controllers/customer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { CustomerSchema } from './schemas/customer.schema';
import { AccountService } from './services/account.service';

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
    providers: [AccountService]
})
export class BackofficeModule { }
