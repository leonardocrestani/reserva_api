import { Request, Response, NextFunction } from 'express'
import { CustomError } from '../../../common/errors/CustomError'
import { ErrorsHttpStatusCodes } from '../../../common/errors/ErrorsHttpStatusCodes'

export default (error: any, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof CustomError) {
    return res.status(error.statusCode).json({ message: error.message })
  } else {
    return res.status(ErrorsHttpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message })
  }
}
