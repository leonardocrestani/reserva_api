import { CreateUserService } from '../../application/services';
import { GetUserService } from '../../application/services';
import { UserRepositoryPrisma } from '../../infra/repository';
import { ok, create } from '../contracts/HttpResponse';

export class UserController {
    static async register(query: any, params: any, body: any, next: any): Promise<object> {
        const prismaRepository = new UserRepositoryPrisma();
        const userService = new CreateUserService(prismaRepository);
        const newUser = await userService.execute(body.first_name, body.last_name, body.cpf, body.country, body.email,
            body.password, body.phone_number);
        return create(newUser);
    }

    static async findOne(query: any, params: any, body: any, next: any): Promise<object> {
        const prismaRepository = new UserRepositoryPrisma();
        const userService = new GetUserService(prismaRepository);
        const user = await userService.execute(query.email, query.password);
        return ok(user);
    }
}