import generateToken from '../../common/utils/generateToken';
import { AuthenticateUser } from '../../core/use-cases';
import { UserRepository } from '../repository';

export class AuthenticateUserService implements AuthenticateUser {
    constructor(private readonly userRepository: UserRepository) { };

    async execute(email: string, password: string): Promise<object> {
        const user = await this.userRepository.findUser(email, password);
        if (!user) {
            throw new Error("Email ou senha invalidos");
        }
        const token = await generateToken(user);
        return { user: user.email, token }
    }
}