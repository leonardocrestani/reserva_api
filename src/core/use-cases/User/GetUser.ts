import { User } from '../../entities';

export interface GetUser {
    find: (email: string, password: string) => Promise<User>;

    findByEmail: (email: string) => Promise<User>;
}