import { CustomError } from "../../common/errors/CustomError";
import { Errors } from '../../common/errors/Errors';
import { ErrorsHttpStatusCodes } from '../../common/errors/ErrorsHttpStatusCodes';

class UnprocessableEntity extends CustomError {
    constructor(message: string) {
        super(message, ErrorsHttpStatusCodes.UNPROCESSABLE_ENTITY, Errors.UNPROCESSABLE_ENTITY);
    }
}

export { UnprocessableEntity };