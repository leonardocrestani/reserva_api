import { UpdateSchedule } from "../../../core/use-cases/Schedule/UpdateSchedule";
import { ScheduleRepository } from "../../repository";

export class UpdateScheduleService implements UpdateSchedule {
    constructor(
        private readonly scheduleRepository: ScheduleRepository
    ) { };

    async updatePlaceName(hour: number, data: any): Promise<void> {
        await this.scheduleRepository.updatePlaceName(hour, data);
    }
}