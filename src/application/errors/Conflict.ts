import { CustomError } from '../../common/errors/CustomError'
import { Errors } from '../../common/errors/Errors'
import { ErrorsHttpStatusCodes } from '../../common/errors/ErrorsHttpStatusCodes'

class Conflict extends CustomError {
  constructor (message: string) {
    super(message, ErrorsHttpStatusCodes.CONFLICT, Errors.CONFLICT)
  }
}

export { Conflict }
