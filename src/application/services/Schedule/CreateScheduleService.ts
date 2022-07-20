import { ScheduleModel, PlaceModel } from '../../models';
import { CreateSchedule } from "../../../core/use-cases/Schedule/CreateSchedule";
import { PlaceRepositoryPrisma } from "../../../infra/repository";
import { ScheduleRepository } from "../../repository/ScheduleRepository";
import { GetPlaceService } from "../Place/GetPlaceService";
import { BadRequest } from '../../errors';

export class CreateScheduleService implements CreateSchedule {
    constructor(private readonly scheduleRepository: ScheduleRepository) { };

    async create(data: ScheduleModel): Promise<ScheduleModel> {
        const placeRepository = new PlaceRepositoryPrisma();
        const getPlaceService = new GetPlaceService(placeRepository);
        const place = await getPlaceService.findByName(data.place_court_name);
        if (!PlaceModel.isOpen(place.operation_time.days_open, place.operation_time.close_hour, place.operation_time.open_hour)) {
            throw new BadRequest("Local fechado não é possivel cadastrar horario");
        }
        place.courts.map((court: any) => {
            if (court.court_name === data.court_name) {
                data.court_id = court.id;
            }
        });
        return await this.scheduleRepository.create(data);
    }
}