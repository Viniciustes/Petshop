import { Pet } from "../models/pet.model";
import { Result } from "../models/result.model";
import { CreatePetsDto } from "../dtos/create-pets-dto";
import { CustomerService } from "../services/customer.service";
import { ValidatorInterceptor } from "src/interceptors/validator.interceptor";
import { CreatePetsContract } from "../contracts/customer/create.pets.contract";
import { Controller, Post, UseInterceptors, Param, Body, HttpException, HttpStatus, Put } from "@nestjs/common";

@Controller('v1/pets')
export class PetController {

    constructor(
        private readonly customerService: CustomerService
    ) { }


    @Post(':document')
    @UseInterceptors(new ValidatorInterceptor(new CreatePetsContract()))
    async create(@Param('document') document, @Body() model: CreatePetsDto) {
        try {
            const pet = new Pet(model.name, model.gender, model.kind, model.brand);

            await this.customerService.createPet(document, pet);

            return new Result('Animal cadastrado com sucesso', true, model, null);

        } catch (error) {
            error(error);
        }
    }

    @Put(':document/:idpet')
    @UseInterceptors(new ValidatorInterceptor(new CreatePetsContract()))
    async update(@Param('document') document, @Param('idpet') idpet, @Body() model: CreatePetsDto) {
        try {
            const pet = new Pet(model.name, model.gender, model.kind, model.brand);

            await this.customerService.updatePet(document, idpet, pet);

            return new Result('Animal atualizado com sucesso', true, model, null);

        } catch (error) {
            error(error);
        }
    }

    error(error: any) {
        throw new HttpException(new Result('Não foi possível realizar a transação', false, null, error), HttpStatus.BAD_REQUEST);
    }
}