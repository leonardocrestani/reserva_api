import { DeleteUser } from "../../../core/use-cases";
import { NotFound } from "../../errors";
import { UserRepository } from "../../repository";


export class DeleteUserService implements DeleteUser {
    constructor(private readonly userRepository: UserRepository) { }

    async remove(email: string): Promise<void> {
        const exist = await this.userRepository.findByEmail(email);
        if (!exist) {
            throw new NotFound("Nao foi possivel encontrar usuario");
        }
        await this.userRepository.remove(email);
    }
}