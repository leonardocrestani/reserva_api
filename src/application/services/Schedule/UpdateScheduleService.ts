import { UpdateSchedule } from "../../../core/use-cases/Schedule/UpdateSchedule";
import { ScheduleRepository } from "../../repository";

export class UpdateScheduleService implements UpdateSchedule {
    constructor(
        private readonly scheduleRepository: ScheduleRepository
    ) { };

    async updatePlaceName(hour: number, place_name: string): Promise<void> {
        await this.scheduleRepository.updatePlaceName(hour, place_name);
    }

    async updateCourtName(hour: number, court_name: string): Promise<void> {
        await this.scheduleRepository.updateCourtName(hour, court_name);
    }
}