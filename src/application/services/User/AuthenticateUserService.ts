import generateToken from '../../../common/utils/generateToken';
import { AuthenticateUser } from '../../../core/use-cases';
import { UserRepository } from '../../repository';
import { Unauhtorized } from '../../errors/Unauthorized';
import { AuthModel } from '../../models';

export class AuthenticateUserService implements AuthenticateUser {
    constructor(private readonly userRepository: UserRepository) { };

    async authenticate(email: string, password: string): Promise<AuthModel> {
        const user = await this.userRepository.findUser(email, password);
        if (!user) {
            throw new Unauhtorized("Email ou senha invalidos");
        }
        const token = await generateToken(user);
        return { user: user.email, access_token: token }
    }
}