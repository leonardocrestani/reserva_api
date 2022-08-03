import { UpdateSchedule } from "../../../core/use-cases/Schedule/UpdateSchedule";
import { ScheduleRepository } from "../../repository";

export class UpdateScheduleService implements UpdateSchedule {
    constructor(
        private readonly scheduleRepository: ScheduleRepository
    ) { };

    async updatePlaceName(court: any): Promise<void> {
        for (const schedule of court.schedules) {
            await this.scheduleRepository.updatePlaceName(schedule.id, court.place_court_name);
        }
    }

    async updateCourtName(court: any): Promise<void> {
        for (const schedule of court.schedules) {
            await this.scheduleRepository.updateCourtName(schedule.id, court.court_name);
        }
    }
}