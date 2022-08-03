import { DeleteSchedule } from "../../../core/use-cases";
import { ScheduleRepository } from "../../repository";

export class DeleteScheduleService implements DeleteSchedule {
    constructor(
        private readonly scheduleRepository: ScheduleRepository,
    ) { };

    async delete(id: string): Promise<void> {
        await this.scheduleRepository.delete(id);
    }
}