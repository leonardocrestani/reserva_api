import { User } from "../entities";

export interface CreateUser {
    execute: (user: User) => Promise<object>
}