
type InputAuthUserDTO = {
  id?: string
  email?: string,
  password?: string
}

type OutputAuthUserDTO = {
  user: string,
  access_token: string
}

export { InputAuthUserDTO, OutputAuthUserDTO }
