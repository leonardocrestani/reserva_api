import { DeleteCourt } from "../../../core/use-cases";
import { NotFound } from "../../errors";
import { CourtRepository, PlaceRepository } from "../../repository";

export class DeleteCourtService implements DeleteCourt {
    constructor(
        private readonly courtRepository: CourtRepository
    ) { };

    async delete(id: string): Promise<void> {
        await this.courtRepository.delete(id);
    }

}