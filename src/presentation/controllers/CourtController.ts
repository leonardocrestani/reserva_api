import { CreateCourtService, DeleteCourtService, UpdateCourtService, FindCourtService } from '../../application/services'
import { CourtRepositoryMongoose, PlaceRepositoryMongoose, ScheduleRepositoryMongoose } from '../../infra/repository'
import { ok, created, HttpResponse, noContent } from '../contracts/HttpResponse'

export class CourtController {
  static async register (query: any, params: any, body: any, next: any): Promise<HttpResponse> {
    const courtRepository = new CourtRepositoryMongoose()
    const placeRepository = new PlaceRepositoryMongoose()
    const scheduleRepository = new ScheduleRepositoryMongoose()
    const createCourtService = new CreateCourtService(courtRepository, placeRepository, scheduleRepository)
    const newCourt = await createCourtService.create(body)
    return created(newCourt)
  }

  static async findById (query: any, params: any, body: any, next: any): Promise<HttpResponse> {
    const courtRepository = new CourtRepositoryMongoose()
    const getCourtService = new FindCourtService(courtRepository)
    const court = await getCourtService.findById(params.id)
    return ok(court)
  }

  static async update (query: any, params: any, body: any, next: any): Promise<HttpResponse> {
    const courtRepository = new CourtRepositoryMongoose()
    const placeRepository = new PlaceRepositoryMongoose()
    const scheduleRepository = new ScheduleRepositoryMongoose()
    const updateCourtService = new UpdateCourtService(courtRepository, placeRepository, scheduleRepository)
    await updateCourtService.update(params.id, body)
    return noContent()
  }

  static async delete (query: any, params: any, body: any, next: any): Promise<HttpResponse> {
    const courtRepository = new CourtRepositoryMongoose()
    const scheduleRepository = new ScheduleRepositoryMongoose()
    const placeRepository = new PlaceRepositoryMongoose()
    const deleteCourtService = new DeleteCourtService(courtRepository, scheduleRepository, placeRepository)
    await deleteCourtService.delete(params.id)
    return noContent()
  }
}
