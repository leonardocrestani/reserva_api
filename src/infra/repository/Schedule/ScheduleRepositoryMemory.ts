import { ScheduleModel } from "../../../application/models";
import { ScheduleRepository } from "../../../application/repository/ScheduleRepository";

export class ScheduleRepositoryMemory implements ScheduleRepository {

    createdSchedules: Array<ScheduleModel> = [];

    async create(data: ScheduleModel): Promise<ScheduleModel> {
        this.createdSchedules.push(data);
        const schedule = this.createdSchedules[0];
        return schedule;
    }

    async findById(id: string): Promise<ScheduleModel> {
        const schedule = this.createdSchedules.find(schedule => schedule.id === id);
        return schedule;
    }

    async findAllByCourt(place_court_name: string, court_name: string): Promise<ScheduleModel[]> {
        const schedules = this.createdSchedules.map((schedule) => {
            if (schedule.place_name === place_court_name && schedule.court_name === court_name) {
                return schedule;
            }
        });
        return schedules;
    }

    async updatePlaceName(id: string, place_name: string): Promise<ScheduleModel> {
        let schedule = this.createdSchedules.find(schedule => schedule.id === id);
        schedule.place_name = place_name;
        return schedule;
    }

    async updateCourtName(id: string, court_name: string): Promise<ScheduleModel> {
        let schedule = this.createdSchedules.find(schedule => schedule.id === id);
        schedule.court_name = court_name;
        return schedule;
    }

    async update(id: string, data: any): Promise<ScheduleModel> {
        const schedule = this.createdSchedules.find(schedule => schedule.id === id);
        schedule.is_rent = data.is_rent;
        schedule.responsible_person_email = data.responsible_person_email;
        return schedule;
    }

    async delete(id: string): Promise<number> {
        return 1;
    }
}