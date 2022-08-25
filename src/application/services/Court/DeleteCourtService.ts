import { DeleteCourt } from "../../../core/use-cases";
import { NotFound } from "../../errors";
import { CourtRepository, PlaceRepository, ScheduleRepository } from "../../repository";
import { DeleteScheduleService } from "../Schedule/DeleteScheduleService";

export class DeleteCourtService implements DeleteCourt {
    constructor(
        private readonly courtRepository: CourtRepository,
        private readonly scheduleRepository: ScheduleRepository
    ) { };

    async delete(id: string): Promise<void> {
        const court = await this.courtRepository.findById(id);
        const deleteScheduleService = new DeleteScheduleService(this.scheduleRepository);
        for(const schedule of court.schedules) {
            await deleteScheduleService.delete(schedule.id);
        }
        await this.courtRepository.delete(id);
    }

}