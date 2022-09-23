import { Request, Response, NextFunction } from 'express'

export class ExpressAdapter {
  static create (fn: any) {
    return async function (req: Request, res: Response, next: NextFunction) {
      try {
        const result = await fn(req.query, req.params, req.body)
        res.status(result.statusCode).json(result.body)
      } catch (error: any) {
        return next(error)
      }
    }
  }
}
