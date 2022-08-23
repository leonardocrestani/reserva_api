import UserSchema from '../../database/models/User';
import { UserRepository } from '../../../application/repository';
import { UserModel } from '../../../application/models';

export class UserRepositoryPrisma implements UserRepository {
    async create(data: any): Promise<UserModel> {
        console.log(data)
        return await UserSchema.create(
            {
                first_name: data.first_name, last_name: data.last_name, cpf: data.cpf,
                genre: data.genre, country: data.country, email: data.email, password: data.password, phone_number: data.phone_number
            }
        );
    }

    async findByEmail(email: string): Promise<any> {
        return await UserSchema.findOne( { email });
    }

    async update(email: string, data: any): Promise<UserModel> {
        return await UserSchema.findOneAndUpdate({ email }, data,);
    }

    async remove(email: string): Promise<UserModel> {
        return await UserSchema.findOneAndDelete({ email });
    }
}