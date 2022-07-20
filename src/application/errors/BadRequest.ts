import { CustomError } from "../../common/errors/CustomError";
import { Errors } from '../../common/errors/Errors';
import { ErrorsHttpStatusCodes } from '../../common/errors/ErrorsHttpStatusCodes';

class BadRequest extends CustomError {
    constructor(message: string) {
        super(message, ErrorsHttpStatusCodes.BAD_REQUEST, Errors.BAD_REQUEST);
    }
}

export { BadRequest };