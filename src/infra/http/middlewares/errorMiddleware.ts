import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../../../common/errors/CustomError';
import { ErrorsHttpStatusCodes } from '../../../common/errors/ErrorsHttpStatusCodes';
import { Prisma } from '../../database';

export default (error: any, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ message: error.message });
    }
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return res.status(ErrorsHttpStatusCodes.BAD_REQUEST).json({ message: error.message });
    }
    else {
        return res.status(ErrorsHttpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}