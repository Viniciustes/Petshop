import { NestInterceptor, Injectable, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Result } from 'src/modules/backoffice/models/result.model';
import { Contract } from 'src/modules/backoffice/contracts/contract';

@Injectable()
export class ValidatorInterceptor implements NestInterceptor {
    constructor(public contract: Contract) { }

    intercept(context: ExecutionContext, call$: Observable<any>): Observable<any> {

        const body = context.switchToHttp().getRequest().body;
        const valid = this.contract.validate(body);

        if (!valid) {
            throw new HttpException(
                new Result(
                    'Ops, algo saiu errado',
                    false,
                    null,
                    this.contract.errors
                ),
                HttpStatus.BAD_REQUEST
            );
        }

        return call$;
    }
}