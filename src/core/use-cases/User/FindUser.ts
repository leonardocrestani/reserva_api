import { User } from '../../entities';

export interface FindUser {
    find: (email: string, password: string) => Promise<User>;

    findByEmail: (email: string) => Promise<User>;
}