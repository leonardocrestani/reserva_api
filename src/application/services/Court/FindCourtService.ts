import { CourtModel } from "../../models";
import { FindCourt } from "../../../core/use-cases/Court/FindCourt";
import { CourtRepository } from "../../repository";
import { NotFound, UnprocessableEntity } from "../../errors";
import mongoose from "mongoose";

export class FindCourtService implements FindCourt {
    constructor(
        private readonly courtRepository: CourtRepository,
    ) { };

    async findById(id: string): Promise<CourtModel> {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new UnprocessableEntity('Formato de ID invalido');
        }
        const court = await this.courtRepository.findById(id);
        if (!court) {
            throw new NotFound("Quadra nao encontrada");
        }
        return court;
    };
}