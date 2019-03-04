import { Controller, Post, UseInterceptors, Param, Body, HttpException, HttpStatus, Put } from "@nestjs/common";
import { Pet } from "src/modules/backoffice/models/pet.model";
import { Result } from "src/modules/backoffice/models/result.model";
import { PetService } from "src/modules/backoffice/services/pet.service";
import { CreatePetsDto } from "src/modules/backoffice/dtos/Pet/create-pets.dto";
import { ValidatorInterceptor } from "src/interceptors/validator.interceptor";
import { CreatePetsContract } from "src/modules/backoffice/contracts/pet/create-pet.contract";

@Controller('v1/pets')
export class PetController {

    constructor(
        private readonly service: PetService
    ) { }

    @Post(':document')
    @UseInterceptors(new ValidatorInterceptor(new CreatePetsContract()))
    async create(@Param('document') document, @Body() model: CreatePetsDto) {
        try {
            const pet = new Pet(model.name, model.gender, model.kind, model.brand);

            await this.service.create(document, pet);

            return new Result('Animal cadastrado com sucesso!', true, model, null);

        } catch (error) {
            this.error(error);
        }
    }

    @Put(':document/:idpet')
    @UseInterceptors(new ValidatorInterceptor(new CreatePetsContract()))
    async update(@Param('document') document, @Param('idpet') idpet, @Body() model: CreatePetsDto) {
        try {
            const pet = new Pet(model.name, model.gender, model.kind, model.brand);

            await this.service.update(document, idpet, pet);

            return new Result('Animal atualizado com sucesso!', true, model, null);

        } catch (error) {
            this.error(error);
        }
    }

    error(error: any) {
        throw new HttpException(new Result('Não foi possível realizar a transação!', false, null, error), HttpStatus.BAD_REQUEST);
    }
}