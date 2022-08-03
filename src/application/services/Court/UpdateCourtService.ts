import { FindPlaceService } from "..";
import { UpdateCourt } from "../../../core/use-cases";
import { CourtRepository, PlaceRepository, ScheduleRepository } from "../../repository";
import { Conflict } from "../../errors";
import { UpdateScheduleService } from "../Schedule/UpdateScheduleService";

export class UpdateCourtService implements UpdateCourt {
    constructor(
        private readonly courtRepository: CourtRepository,
        private readonly scheduleRepository: ScheduleRepository
    ) { };

    async update(id: string, data: any): Promise<void> {
        const court = await this.courtRepository.findById(id)
        if (court.court_name === data.court_name) {
            throw new Conflict("Quadra ja existente");
        }
        const updatedCourt = await this.courtRepository.update(court.id, data);
        const updateScheduleService = new UpdateScheduleService(this.scheduleRepository);
        await updateScheduleService.updateCourtName(updatedCourt);
    }

    async updatePlaceName(place: any): Promise<void> {
        const updateScheduleService = new UpdateScheduleService(this.scheduleRepository);
        for (const court of place.courts) {
            const courtUpdated = await this.courtRepository.updatePlaceName(court.id, place.place_name);
            await updateScheduleService.updatePlaceName(courtUpdated);
        }
    }
}