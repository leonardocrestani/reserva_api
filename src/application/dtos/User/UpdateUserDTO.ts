
type InputUpdateUserDTO = {
  first_name?: string,
  last_name?: string,
  cpf?: string,
  genre?: string,
  country?: string,
  email?: string,
  password?: string,
  phone_number?: string,
  schedules: Array<any>
}

export { InputUpdateUserDTO }
