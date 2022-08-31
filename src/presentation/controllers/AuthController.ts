import { UserRepositoryMongoose } from '../../infra/repository/index';
import { AuthenticateUserService } from '../../application/services/User/AuthenticateUserService';
import { ok, HttpResponse } from '../contracts/HttpResponse';

export class AuthController {
    static async authenticate(query: any, params: any, body: any, next: any): Promise<HttpResponse> {
        const { email, password } = body;
        const mongooseRepository = new UserRepositoryMongoose();
        const authenticaUserService = new AuthenticateUserService(mongooseRepository);
        const auth = await authenticaUserService.authenticate(email, password);
        return ok(auth);
    }
}