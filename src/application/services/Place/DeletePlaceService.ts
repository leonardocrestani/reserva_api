import { DeletePlace } from "../../../core/use-cases";
import { NotFound } from "../../errors";
import { PlaceRepository } from "../../repository";

export class DeletePlaceService implements DeletePlace {
    constructor(private readonly placeRepository: PlaceRepository) { }

    async delete(cnpj: string): Promise<void> {
        const place = await this.placeRepository.findByCnpj(cnpj);
        if (!place) {
            throw new NotFound("Local nao encontrado");
        }
        await this.placeRepository.delete(cnpj);
    }
}