import { CreateUserService } from '../../application/services';
import { FindUserService } from '../../application/services';
import { UserRepositoryPrisma } from '../../infra/repository';
import { ok, created, HttpResponse } from '../contracts/HttpResponse';

export class UserController {
    static async register(query: any, params: any, body: any, next: any): Promise<HttpResponse> {
        const prismaRepository = new UserRepositoryPrisma();
        const createUserService = new CreateUserService(prismaRepository);
        const newUser = await createUserService.create(body);
        return created(newUser);
    }

    static async findOne(query: any, params: any, body: any, next: any): Promise<HttpResponse> {
        const prismaRepository = new UserRepositoryPrisma();
        const getUserService = new FindUserService(prismaRepository);
        const user = await getUserService.find(query.email, query.password);
        return ok(user);
    }
}