import { User } from '../../entities';

export interface FindUser {
    findByEmail: (email: string) => Promise<User>;
    findById: (id: string) => Promise<User>;
}