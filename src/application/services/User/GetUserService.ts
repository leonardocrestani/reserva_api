import { UserModel } from '../../models';
import { GetUser } from '../../../core/use-cases';
import { UserRepository } from '../../repository';

export class GetUserService implements GetUser {
    constructor(private readonly userRepository: UserRepository) { }

    async find(email: string, password: string): Promise<UserModel> {
        const user = await this.userRepository.findUser(email, password);
        if (!user) {
            throw new Error("Nao foi possivel encontrar usuario");
        }
        return user;
    };

}