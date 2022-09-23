type OutputFindAllPlacesDTO = {
  id?: string,
  name: string,
  cnpj: string,
  number_of_courts: number,
  address: {
    city_code: string,
    city_name: string,
    state: string,
    country: string,
    street: string,
    neighborhood: string
  },
  contact: {
    name: string,
    phone_number: string
  },
  operation_time: {
    open_hour: number,
    close_hour: number,
    days_open: Array<string>
  },
  courts: Array<{
    id?: string,
    place_name: string,
    court_name: string,
    place_id: string
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
    created_at?: Date,
    updated_at?: Date
  }>
}

export { OutputFindAllPlacesDTO }
