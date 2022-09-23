type InputCreateScheduleDTO = {
  court_id: string,
  place_name: string,
  court_name: string,
  hour: number,
  day: string
}

type OutputCreateScheduleDTO = {
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
}

export { InputCreateScheduleDTO, OutputCreateScheduleDTO }
