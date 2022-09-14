import { Errors } from './Errors'
import { ErrorsHttpStatusCodes } from './ErrorsHttpStatusCodes'

export abstract class CustomError {
  public readonly message: string
  public readonly errorName: string
  public readonly statusCode: number

  constructor (message: string, statusCode: ErrorsHttpStatusCodes, errorName: Errors) {
    this.message = message
    this.statusCode = statusCode
    this.errorName = errorName
  }
}
