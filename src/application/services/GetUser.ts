import { User } from '../../core/entities';
import { GetUserById } from '../../core/use-cases/GetUser';
import { UserRepository } from '../repository';

export class GetUserService implements GetUserById {
    constructor(private readonly userRepository: UserRepository) { }

    async execute(email: string, password: string): Promise<User> {
        const user = await this.userRepository.findUser(email, password);
        if (!user) {
            throw new Error("Nao foi possivel encontrar usuario");
        }
        return user;
    };

}