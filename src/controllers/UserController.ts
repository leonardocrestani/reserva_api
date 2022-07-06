import { CreateUserService } from '../application/services';
import { UserRepositoryPrisma } from '../infra/repository';

export class UserController {
    static async register(params: any, body: any): Promise<object> {
        const prismaRepository = new UserRepositoryPrisma();
        const userService = new CreateUserService(prismaRepository);
        const newUser = await userService.execute(body.name, body.surname, body.cpf, body.country, body.email,
            body.password, body.phone_number);
        return newUser;
    }
}