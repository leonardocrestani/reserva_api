import { CustomError } from "../../common/errors/CustomError";
import { Errors } from '../../common/errors/Errors';
import { ErrorsHttpStatusCodes } from '../../common/errors/ErrorsHttpStatusCodes';

class NotFound extends CustomError {
    constructor(message: string) {
        super(message, ErrorsHttpStatusCodes.NOT_FOUND, Errors.NOT_FOUND);
    }
}

export { NotFound };