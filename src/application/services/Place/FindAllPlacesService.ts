import { FindAllPlaces } from '../../../core/use-cases'
import { PlaceModel } from '../../models'
import { PlaceRepository } from '../../repository'

export class FindAllPlacesService implements FindAllPlaces {
  constructor (private readonly placeRepository: PlaceRepository) { }

  async findAll (limit: number, offset: number): Promise<PlaceModel[]> {
    const places = await this.placeRepository.findAll(limit, offset)
    return places
  }
}
