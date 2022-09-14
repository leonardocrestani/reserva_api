import { CreateUserService, FindUserService } from '../../application/services'
import { DeleteUserService } from '../../application/services/User/DeleteUserService'
import { UpdateUserService } from '../../application/services/User/UpdateUserService'
import { ScheduleRepositoryMongoose, UserRepositoryMongoose } from '../../infra/repository'
import { ok, created, noContent, HttpResponse } from '../contracts/HttpResponse'

export class UserController {
  static async register (query: any, params: any, body: any, next: any): Promise<HttpResponse> {
    const mongooseRepository = new UserRepositoryMongoose()
    const createUserService = new CreateUserService(mongooseRepository)
    const newUser = await createUserService.create(body)
    return created(newUser)
  }

  static async findByEmail (query: any, params: any, body: any, next: any): Promise<HttpResponse> {
    const mongooseRepository = new UserRepositoryMongoose()
    const getUserService = new FindUserService(mongooseRepository)
    const user = await getUserService.findByEmail(params.email)
    return ok(user)
  }

  static async update (query: any, params: any, body: any, next: any): Promise<HttpResponse> {
    const mongooseRepository = new UserRepositoryMongoose()
    const updateUserService = new UpdateUserService(mongooseRepository)
    await updateUserService.update(params.email, body)
    return noContent()
  }

  static async delete (query: any, params: any, body: any, next: any): Promise<HttpResponse> {
    const userMongooseRepository = new UserRepositoryMongoose()
    const scheduleRepository = new ScheduleRepositoryMongoose()
    const deleteUserService = new DeleteUserService(userMongooseRepository, scheduleRepository)
    await deleteUserService.remove(params.email)
    return noContent()
  }
}
