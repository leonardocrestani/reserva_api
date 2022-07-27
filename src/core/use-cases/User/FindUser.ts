import { User } from '../../entities';

export interface FindUser {
    findOne: (email: string) => Promise<User>;
}