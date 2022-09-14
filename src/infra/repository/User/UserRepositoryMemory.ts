import { UserRepository } from '../../../application/repository'
import { UserModel } from '../../../application/models/UserModel'

export class UserRepositoryMemory implements UserRepository {
  createdUsers: Array<UserModel> = []

  async create (data: any): Promise<UserModel> {
    this.createdUsers.push(data)
    const createdUser = this.createdUsers[0]
    return createdUser
  };

  async findByEmail (email: string): Promise<any> {
    const user = this.createdUsers.find(user => user.email === email)
    return user
  }

  async findById (id: string): Promise<UserModel> {
    const user = this.createdUsers.find(user => user.id === id)
    return user
  }

  async update (email: string, data: any): Promise<any> {

  }

  async remove (email: string): Promise<any> {
    this.createdUsers.find((user) => {
      if (user.email === email) {
        this.createdUsers.pop()
      }
    })
  }
}
