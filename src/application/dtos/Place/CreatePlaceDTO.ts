import { CourtModel } from '../../models'

type InputCreatePlaceDTO = {
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
  courts: Array<CourtModel>
}

type OutputCreatePlaceDTO = {
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
  courts: Array<CourtModel>,
  created_at?: Date,
  updated_at?: Date
}

export { InputCreatePlaceDTO, OutputCreatePlaceDTO }
