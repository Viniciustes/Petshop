import { Post, Param, Body, UseInterceptors, HttpException, HttpStatus, Controller } from "@nestjs/common";
import { CreditCard } from "src/modules/backoffice/models/credit-cart.model";
import { ValidatorInterceptor } from "src/interceptors/validator.interceptor";
import { CreateCreditCardContract } from "src/modules/backoffice/contracts/creditcard/create-credit-card-contract";
import { CreditCardService } from "src/modules/backoffice/services/creditCard.service";
import { Result } from "src/modules/backoffice/models/result.model";

@Controller('v1/creditcards')
export class CreditCardController {

    constructor(
        private readonly service: CreditCardService
    ) { }

    @Post(':document')
    @UseInterceptors(new ValidatorInterceptor(new CreateCreditCardContract()))
    async createOrUpdate(@Param('document') document, @Body() model: CreditCard) {
        try {
            await this.service.createOrUpdate(document, model);

            return new Result('Cartão de credito criado/alterado com sucesso!', true, model, null);

        } catch (error) {
            this.error(error);
        }
    }

    error(error: any) {
        throw new HttpException(new Result('Não foi possível realizar a transação!', false, null, error), HttpStatus.BAD_REQUEST);
    }
}