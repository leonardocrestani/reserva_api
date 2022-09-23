import { FindAllPlaces } from '../../../core/use-cases'
import { PlaceRepository } from '../../repository'
import { OutputFindAllPlacesDTO } from '../../dtos'
import calculatePages from '../../../common/utils/calculatePages'

export class FindAllPlacesService implements FindAllPlaces {
  constructor (private readonly placeRepository: PlaceRepository) { }

  async findAll (limit: number, offset: number): Promise<OutputFindAllPlacesDTO> {
    const places = await this.placeRepository.findAll(limit, offset)
    const totalRecords = await this.placeRepository.countPlaces()
    const currentPage = (offset === 0) ? 1 : offset + 1
    const infos = { limit, currentPage, pages: calculatePages(limit, currentPage, totalRecords), totalRecords }
    const object = Object.assign({ places }, infos)
    return object
  }
}
