import { CreateUserService } from '../../application/services';
import { FindUserService } from '../../application/services';
import { DeleteUserService } from '../../application/services/User/DeleteUserService';
import { UpdateUserService } from '../../application/services/User/UpdateUserService';
import { ScheduleRepositoryPrisma, UserRepositoryPrisma } from '../../infra/repository';
import { ok, created, noContent, HttpResponse } from '../contracts/HttpResponse';

export class UserController {
    static async register(query: any, params: any, body: any, next: any): Promise<HttpResponse> {
        const prismaRepository = new UserRepositoryPrisma();
        const createUserService = new CreateUserService(prismaRepository);
        const newUser = await createUserService.create(body);
        return created(newUser);
    }

    static async findByEmail(query: any, params: any, body: any, next: any): Promise<HttpResponse> {
        const prismaRepository = new UserRepositoryPrisma();
        const getUserService = new FindUserService(prismaRepository);
        const user = await getUserService.findByEmail(params.email);
        return ok(user);
    }

    static async update(query: any, params: any, body: any, next: any): Promise<HttpResponse> {
        const prismaRepository = new UserRepositoryPrisma();
        const updateUserService = new UpdateUserService(prismaRepository);
        await updateUserService.update(params.email, body);
        return noContent();
    }

    static async delete(query: any, params: any, body: any, next: any): Promise<HttpResponse> {
        const userPrismaRepository = new UserRepositoryPrisma();
        const scheduleRepository = new ScheduleRepositoryPrisma();
        const deleteUserService = new DeleteUserService(userPrismaRepository, scheduleRepository);
        console.log(params.email)
        await deleteUserService.remove(params.email);
        return noContent();
    }
}