import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
dotenv.config({
  path: process.env.NODE_ENV === 'local' ? '.env.local' : '.env'
})

export default async (user: any) => {
  const token = jwt.sign({ id: user.id, email: user.email }, `${process.env.SECRET_KEY}`, { expiresIn: '60m' })
  return token
}
