import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/modules/backoffice/schemas/user.schema';
import { PetService } from 'src/modules/backoffice/services/pet.service';
import { CustomerSchema } from 'src/modules/backoffice/schemas/customer.schema';
import { AccountService } from 'src/modules/backoffice/services/account.service';
import { AddressService } from 'src/modules/backoffice/services/address.service';
import { PetController } from 'src/modules/backoffice/controllers/pet.controller';
import { CustomerService } from 'src/modules/backoffice/services/customer.service';
import { AddressController } from 'src/modules/backoffice/controllers/address.controller';
import { CustomerController } from 'src/modules/backoffice/controllers/customer.controller';
import { CreditCardService } from 'src/modules/backoffice/services/creditCard.service';
import { CreditCardController } from 'src/modules/backoffice/controllers/creditcard.controller';

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
    controllers: [
        AddressController,
        CreditCardController,
        CustomerController, 
        PetController
    ],
    providers: [
        AccountService,
        AddressService,
        CreditCardService,
        CustomerService,
        PetService
    ]
})
export class BackofficeModule { }
