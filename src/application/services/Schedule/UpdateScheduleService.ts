import { UpdateSchedule } from "../../../core/use-cases/Schedule/UpdateSchedule";
import { ScheduleRepository } from "../../repository";

export class UpdateScheduleService implements UpdateSchedule {
    constructor(
        private readonly scheduleRepository: ScheduleRepository
    ) { };

    async updatePlaceName(id: string, place_name: string): Promise<void> {
        await this.scheduleRepository.updatePlaceName(id, place_name);
    }

    async updateCourtName(id: string, court_name: string): Promise<void> {
        await this.scheduleRepository.updateCourtName(id, court_name);
    }
}