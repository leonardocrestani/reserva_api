
type InputUpdateUserDTO = {
  first_name?: string,
  last_name?: string,
  cpf?: string,
  genre?: string,
  country?: string,
  email?: string,
  password?: string,
  phone_number?: string,
  schedules: Array<{
    id?: string,
    place_name: string,
    court_name: string,
    hour: number,
    day: string,
    court_id: string,
    is_rent: boolean,
    responsible_person_full_name: string | null,
    responsible_person_email: string | null,
    responsible_person_id: string | null
    created_at?: Date,
    updated_at?: Date
  }>
}

export { InputUpdateUserDTO }
