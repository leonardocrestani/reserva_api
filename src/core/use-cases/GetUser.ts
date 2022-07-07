import { User } from '../entities/User';

export interface GetUserById {
    execute: (email: string, password: string) => Promise<object>
}