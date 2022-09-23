import { FindAllPlaces } from '../../../core/use-cases'
import { PlaceRepository } from '../../repository'
import { OutputFindAllPlacesDTO } from '../../dtos'

export class FindAllPlacesService implements FindAllPlaces {
  constructor (private readonly placeRepository: PlaceRepository) { }

  async findAll (limit: number, offset: number): Promise<OutputFindAllPlacesDTO[]> {
    const places = await this.placeRepository.findAll(limit, offset)
    return places
  }
}
