import { User } from '../../core/entities';
import { GetUser } from '../../core/use-cases';
import { UserRepository } from '../repository';

export class GetUserService implements GetUser {
    constructor(private readonly userRepository: UserRepository) { }

    async execute(email: string, password: string): Promise<object> {
        const user = await this.userRepository.findUser(email, password);
        console.log(user)
        if (!user) {
            throw new Error("Nao foi possivel encontrar usuario");
        }
        return user;
    };

}