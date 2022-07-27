import generateToken from '../../../common/utils/generateToken';
import decryptPassword from '../../../common/utils/decryptPassword';
import { AuthenticateUser } from '../../../core/use-cases';
import { UserRepository } from '../../repository';
import { Unauhtorized } from '../../errors/Unauthorized';
import { AuthModel } from '../../models';

export class AuthenticateUserService implements AuthenticateUser {
    constructor(private readonly userRepository: UserRepository) { };

    async authenticate(email: string, password: string): Promise<AuthModel> {
        console.log(password);
        const user = await this.userRepository.findOne(email);
        if (user && await decryptPassword(user, password)) {
            const token = await generateToken(user);
            return { user: user.email, access_token: token }
        }
        else {
            throw new Unauhtorized("Email ou senha incorretos");
        }
    }
}