import { UserRepositoryPrisma } from '../../infra/repository/index';
import { AuthenticateUserService } from '../../application/services/User/AuthenticateUserService';
import { ok } from '../contracts/HttpResponse';

export class AuthController {
    static async authenticate(query: any, params: any, body: any, next: any): Promise<object> {
        const { email, password } = query;
        const prismaRepository = new UserRepositoryPrisma();
        const authenticaUserService = new AuthenticateUserService(prismaRepository);
        const auth = await authenticaUserService.authenticate(email, password);
        return ok(auth);
    }
}