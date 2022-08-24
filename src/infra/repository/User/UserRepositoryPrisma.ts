import UserSchema from '../../database/models/User';
import { UserRepository } from '../../../application/repository';
import { UserModel } from '../../../application/models';

export class UserRepositoryPrisma implements UserRepository {
    async create(data: any): Promise<UserModel> {
        return await UserSchema.create(data);
    }

    async findByEmail(email: string): Promise<any> {
        return await UserSchema.findOne( { email });
    }

    async update(email: string, data: any): Promise<number> {
        return await UserSchema.findOneAndUpdate({ email }, data);
    }

    async remove(email: string): Promise<UserModel> {
        return await UserSchema.findOneAndDelete({ email });
    }
}