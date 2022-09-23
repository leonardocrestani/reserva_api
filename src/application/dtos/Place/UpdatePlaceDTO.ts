import { CourtModel } from '../../models'

type InputUpdatePlaceDTO = {
    name?: string,
    cnpj?: string,
    address?: {
      city_code?: number,
      city_name?: string,
      state?: string,
      street?: string,
      neighborhood?: string
    },
    contact?: {
      name?: string,
      phone_number?: string
    },
    operation_time?: {
      open_hour?: number,
      close_hour?: number,
      days_open?: Array<string>
    }
    courts?: Array<CourtModel>
  }

export { InputUpdatePlaceDTO }
