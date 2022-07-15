import { CreateSchedule } from "../../../core/use-cases/Schedule/CreateSchedule";
import { ScheduleModel } from "../../models/ScheduleModel";
import { ScheduleRepository } from "../../repository/ScheduleRepository";

export class CreateScheduleService implements CreateSchedule {
    constructor(private readonly courtRepository: ScheduleRepository) { };

    async create(data: ScheduleModel): Promise<object> {
        return await this.courtRepository.create(data);
    }
}