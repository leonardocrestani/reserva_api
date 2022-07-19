import { CustomError } from "../../common/errors/CustomError";
import { Errors } from '../../common/errors/Errors';
import { ErrorsHttpStatusCodes } from '../../common/errors/ErrorsHttpStatusCodes';

class Unauhtorized extends CustomError {
    constructor(message: string) {
        super(message, ErrorsHttpStatusCodes.UNAUTHORIZED, Errors.UNAUTHORIZED);
    }
}

export { Unauhtorized };