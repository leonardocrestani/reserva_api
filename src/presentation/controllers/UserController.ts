import { CreateUserService } from '../../application/services';
import { GetUserService } from '../../application/services';
import { UserRepositoryPrisma } from '../../infra/repository';
import { ok, created } from '../contracts/HttpResponse';

export class UserController {
    static async register(query: any, params: any, body: any, next: any): Promise<object> {
        const prismaRepository = new UserRepositoryPrisma();
        const userService = new CreateUserService(prismaRepository);
        const newUser = await userService.create(body);
        return created(newUser);
    }

    static async findOne(query: any, params: any, body: any, next: any): Promise<object> {
        const prismaRepository = new UserRepositoryPrisma();
        const userService = new GetUserService(prismaRepository);
        const user = await userService.find(query.email, query.password);
        return ok(user);
    }
}