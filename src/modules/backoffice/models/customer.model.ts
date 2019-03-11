import { Pet } from 'src/modules/backoffice/models/pet.model';
import { User } from 'src/modules/backoffice/models//user.model';
import { Address } from 'src/modules/backoffice/models//address.model';
import { CreditCard } from 'src/modules/backoffice/models//credit-cart.model';

export class Customer {
    constructor(
        public name: string,
        public document: string,
        public email: string,
        public pets: Pet[],
        public billingAddress: Address,
        public shippingAddress: Address,
        public creditCard: CreditCard,
        public user: User,
    ) { }
}
