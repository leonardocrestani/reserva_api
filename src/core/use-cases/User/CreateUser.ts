import { User } from "../../entities";

export interface CreateUser {
    create: (user: User) => Promise<object>
}