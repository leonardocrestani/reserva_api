import { FindPlace } from '../../../core/use-cases'
import { NotFound } from '../../errors'
import { PlaceRepository } from '../../repository'
import { OutputFindPlaceDTO } from '../../dtos/Place/FindPlaceDTO'

export class FindPlaceService implements FindPlace {
  constructor (private readonly placeRepository: PlaceRepository) { }

  async findById (id: string): Promise<OutputFindPlaceDTO> {
    const place = await this.placeRepository.findById(id)
    if (!place) {
      throw new NotFound('Local nao encontrado')
    }
    return place
  };

  async findByName (name: string): Promise<OutputFindPlaceDTO> {
    const place = await this.placeRepository.findByName(name)
    if (!place) {
      throw new NotFound('Local nao encontrado')
    }
    return place
  };

  async findByCnpj (cnpj: string): Promise<OutputFindPlaceDTO> {
    const place = await this.placeRepository.findByCnpj(cnpj)
    if (!place) {
      throw new NotFound('Local nao encontrado')
    }
    return place
  }
}
