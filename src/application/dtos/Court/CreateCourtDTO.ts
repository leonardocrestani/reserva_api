import { ScheduleModel } from '../../models'

type InputCreateCourtDTO = {
  place_id?:string
  place_name: string,
  court_name: string
}

type OutputCreateCourtDTO = {
  id?: string,
  place_name: string,
  court_name: string,
  place_id: string
  schedules: Array<ScheduleModel>
  created_at?: Date,
  updated_at?: Date
}

export { InputCreateCourtDTO, OutputCreateCourtDTO }
