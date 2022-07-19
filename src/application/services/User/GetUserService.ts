import { UserModel } from '../../models';
import { GetUser } from '../../../core/use-cases';
import { UserRepository } from '../../repository';
import { NotFound } from '../../errors/NotFound';

export class GetUserService implements GetUser {
    constructor(private readonly userRepository: UserRepository) { }

    async find(email: string, password: string): Promise<UserModel> {
        const user = await this.userRepository.findUser(email, password);
        if (!user) {
            throw new NotFound('User not found');
        }
        return user;
    };

    async findByEmail(email: string): Promise<any> {
        const user = await this.userRepository.findUserByEmail(email);
        if (!user) {
            throw new NotFound('User not found');
        }
        return user;
    }

}