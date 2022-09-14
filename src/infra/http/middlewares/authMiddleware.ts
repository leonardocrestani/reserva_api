import dotenv from 'dotenv'
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { Unauhtorized } from '../../../application/errors/Unauthorized'
dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.env.local' : '.env'
})
export default (req: any, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    throw new Unauhtorized('No token provided')
  }
  const [bearer, token] = authHeader.split(' ')
  jwt.verify(token, `${process.env.SECRET_KEY}`, (error: any) => {
    if (error) {
      throw new Unauhtorized('Invalid token')
    }
    const decodedToken : any = jwt.verify(token, `${process.env.SECRET_KEY}`)
    const userId = decodedToken.id
    req.query = { userId }
    return next()
  })
}
