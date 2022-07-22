import { UserModel } from '../../models';
import { FindUser } from '../../../core/use-cases';
import { UserRepository } from '../../repository';
import { NotFound } from '../../errors/NotFound';

export class FindUserService implements FindUser {
    constructor(private readonly userRepository: UserRepository) { }

    async find(email: string, password: string): Promise<UserModel> {
        const user = await this.userRepository.findUser(email, password);
        if (!user) {
            throw new NotFound('User not found');
        }
        return user;
    };

    async findByEmail(email: string): Promise<UserModel> {
        const user = await this.userRepository.findUserByEmail(email);
        if (!user) {
            throw new NotFound('Usuario nao encontrado');
        }
        return user;
    }

}