import { ScheduleModel } from '../../models'

type InputUpdateCourtDTO = {
  court_name?: string,
  schedules?: Array<ScheduleModel>
}

export { InputUpdateCourtDTO }
