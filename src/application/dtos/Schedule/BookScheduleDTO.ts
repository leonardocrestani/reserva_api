type InputBookScheduleDTO = {
  is_rent?: boolean,
  responsible_person_email: string,
  responsible_person_id?: string,
  responsible_person_full_name?: string
}

type OutputBookScheduleDTO = {
  id?: string,
  place_name: string,
  court_name: string,
  hour: number,
  day: string,
  court_id: string,
  is_rent: boolean,
  responsible_person_full_name: string,
  responsible_person_email: string,
  responsible_person_id: string
  created_at?: Date,
  updated_at?: Date
}

export { InputBookScheduleDTO, OutputBookScheduleDTO }
