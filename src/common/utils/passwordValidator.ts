import bcrypt from 'bcrypt'
import { InputAuthUserDTO } from '../../application/dtos'

export default async function passwordValidator (user: InputAuthUserDTO, password: string) {
  const match = await bcrypt.compare(password, user.password)
  return match
}
