import { CreateSchedule } from "../../../core/use-cases/Schedule/CreateSchedule";
import { PlaceRepositoryPrisma } from "../../../infra/repository";
import { ScheduleModel } from "../../models/ScheduleModel";
import { ScheduleRepository } from "../../repository/ScheduleRepository";
import { GetPlaceService } from "../Place/GetPlaceService";

export class CreateScheduleService implements CreateSchedule {
    constructor(private readonly scheduleRepository: ScheduleRepository) { };

    async create(data: ScheduleModel): Promise<object> {
        const placeRepository = new PlaceRepositoryPrisma();
        const getPlaceService = new GetPlaceService(placeRepository);
        const place = await getPlaceService.findByName(data.place_court_name);
        place.courts.map((court: any) => {
            if (court.court_name === data.court_name) {
                data.court_id = court.id;
            }
        });
        return await this.scheduleRepository.create(data);
    }
}