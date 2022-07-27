import { UserModel } from '../../models';
import { FindUser } from '../../../core/use-cases';
import { UserRepository } from '../../repository';
import { NotFound } from '../../errors/NotFound';

export class FindUserService implements FindUser {
    constructor(private readonly userRepository: UserRepository) { }

    async findOne(email: string): Promise<UserModel> {
        const user = await this.userRepository.findOne(email);
        if (!user) {
            throw new NotFound('Usuario nao encontrado');
        }
        return user;
    };

}