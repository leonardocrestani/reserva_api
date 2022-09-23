import { CreatePlaceService, UpdatePlaceService, FindPlaceService, DeletePlaceService, FindAllPlacesService } from '../../application/services'
import { CourtRepositoryMongoose, PlaceRepositoryMongoose, ScheduleRepositoryMongoose } from '../../infra/repository'
import { ok, created, HttpResponse, noContent } from '../contracts/HttpResponse'

export class PlaceController {
  static async register (query: any, params: any, body: any): Promise<HttpResponse> {
    const placeRepository = new PlaceRepositoryMongoose()
    const courtRepository = new CourtRepositoryMongoose()
    const scheduleRepository = new ScheduleRepositoryMongoose()
    const createPlaceService = new CreatePlaceService(placeRepository, courtRepository, scheduleRepository)
    const newPlace = await createPlaceService.create(body)
    return created(newPlace)
  }

  static async findAll (query: any, params: any, body: any): Promise<HttpResponse> {
    const placeRepository = new PlaceRepositoryMongoose()
    const getPlaceService = new FindAllPlacesService(placeRepository)
    const limit = parseInt(query.limit, 10)
    const offset = parseInt(query.offset, 10)
    const places = await getPlaceService.findAll(limit, offset)
    return ok(places)
  }

  static async findByName (query: any, params: any, body: any): Promise<HttpResponse> {
    const placeRepository = new PlaceRepositoryMongoose()
    const getPlaceService = new FindPlaceService(placeRepository)
    const place = await getPlaceService.findByName(params.name)
    return ok(place)
  }

  static async update (query: any, params: any, body: any): Promise<HttpResponse> {
    const placeRepository = new PlaceRepositoryMongoose()
    const courtRepository = new CourtRepositoryMongoose()
    const scheduleRepository = new ScheduleRepositoryMongoose()
    const updatePlaceService = new UpdatePlaceService(placeRepository, courtRepository, scheduleRepository)
    await updatePlaceService.update(params.name, body)
    return noContent()
  }

  static async delete (query: any, params: any, body: any): Promise<HttpResponse> {
    const placeRepository = new PlaceRepositoryMongoose()
    const courtRepository = new CourtRepositoryMongoose()
    const scheduleRepository = new ScheduleRepositoryMongoose()
    const deletePlaceService = new DeletePlaceService(placeRepository, courtRepository, scheduleRepository)
    await deletePlaceService.delete(params.name)
    return noContent()
  }
}
