import { UserModel } from "../models/UserModel"

export default interface UserRepository {
    create: (user: UserModel) => Promise<UserModel>;
}