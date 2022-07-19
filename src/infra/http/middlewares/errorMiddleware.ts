import { isCelebrateError } from 'celebrate';
import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../../../common/errors/CustomError';
import { ErrorsHttpStatusCodes } from '../../../common/errors/ErrorsHttpStatusCodes';

export default (error: any, req: Request, res: Response, next: NextFunction) => {
    if (isCelebrateError(error)) {
        return res.status(400).json({
            message: error.details.entries().next().value[1].details[0].message,
            path: error.details.entries().next().value[1].details[0].path
        });
    }
    if(error instanceof CustomError) {
        return res.status(error.statusCode).json({message: error.message});
    }
    else {
        return res.status(ErrorsHttpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}