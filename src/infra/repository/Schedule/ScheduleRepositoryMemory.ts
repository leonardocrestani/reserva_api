import { ScheduleModel } from "../../../application/models";
import { ScheduleRepository } from "../../../application/repository/ScheduleRepository";

export class ScheduleRepositoryMemory implements ScheduleRepository {

    createdSchedules: Array<ScheduleModel> = [];

    async create(data: ScheduleModel): Promise<ScheduleModel> {
        this.createdSchedules.push(data);
        const schedule = this.createdSchedules[0];
        return schedule;
    }

    async find(place_court_name: string, court_name: string, hour: number): Promise<ScheduleModel> {
        const schedule = this.createdSchedules.find(schedule => schedule.place_court_name === place_court_name && schedule.court_name === court_name && schedule.hour === hour);
        return schedule;
    }

    async findAllByCourt(place_court_name: string, court_name: string): Promise<ScheduleModel[]> {
        const schedules = this.createdSchedules.map((schedule) => {
            if (schedule.place_court_name === place_court_name && schedule.court_name === court_name) {
                return schedule;
            }
        });
        return schedules;
    }

    async updatePlaceName(hour: number, place_name: string): Promise<ScheduleModel> {
        let schedule = this.createdSchedules.find(schedule => schedule.hour === hour);
        schedule.place_court_name = place_name;
        return schedule;
    }

    async updateCourtName(hour: number, court_name: string): Promise<ScheduleModel> {
        let schedule = this.createdSchedules.find(schedule => schedule.hour === hour);
        schedule.court_name = court_name;
        return schedule;
    }

    async update(hour: number, data: any): Promise<void> {
        const schedule = this.createdSchedules.find(schedule => schedule.hour === hour);
        schedule.is_rent = data.is_rent;
        schedule.responsible_person_email = data.responsible_person_email;
    }
}