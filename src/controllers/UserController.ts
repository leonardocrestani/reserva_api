import { CreateUserService } from '../application/services';
import { GetUserService } from '../application/services';
import { UserRepositoryPrisma } from '../infra/repository';

export class UserController {
    static async register(params: any, body: any): Promise<object> {
        const prismaRepository = new UserRepositoryPrisma();
        const userService = new CreateUserService(prismaRepository);
        const newUser = await userService.execute(body.first_name, body.last_name, body.cpf, body.country, body.email,
            body.password, body.phone_number);
        return newUser;
    }

    static async findOne(params: any, body:any): Promise<object> {
        const prismaRepository = new UserRepositoryPrisma();
        const userService = new GetUserService(prismaRepository);
        const user = await userService.execute(params.email, params.password);
        return user;
    }
}