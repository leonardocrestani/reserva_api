import User from '../entities/User'

export default interface CreateUser {
    execute: (user: User) => Promise<User>
}