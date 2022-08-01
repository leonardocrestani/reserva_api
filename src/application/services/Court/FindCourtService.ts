import { CourtModel } from "../../models";
import { FindCourt } from "../../../core/use-cases/Court/FindCourt";
import { CourtRepository } from "../../repository";
import { NotFound } from "../../errors";

export class FindCourtService implements FindCourt {
    constructor(
        private readonly courtRepository: CourtRepository,
    ) { };

    async findById(id: string): Promise<CourtModel> {
        const court = await this.courtRepository.findById(id);
        if (!court) {
            throw new NotFound("Quadra nao encontrada");
        }
        return court;
    };
}