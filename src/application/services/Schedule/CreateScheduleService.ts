import { CreateSchedule } from "../../../core/use-cases/Schedule/CreateSchedule";
import { PlaceRepositoryPrisma, UserRepositoryPrisma } from "../../../infra/repository";
import { ScheduleModel } from "../../models/ScheduleModel";
import { ScheduleRepository } from "../../repository/ScheduleRepository";
import { GetPlaceService } from "../Place/GetPlaceService";
import { GetUserService } from "../User/GetUserService";

export class CreateScheduleService implements CreateSchedule {
    constructor(private readonly courtRepository: ScheduleRepository) { };

    async create(data: ScheduleModel): Promise<object> {
        const placeRepository = new PlaceRepositoryPrisma();
        const placeService = new GetPlaceService(placeRepository);
        const place = await placeService.findByName(data.place_court_name);
        place.courts.map((court: any) => {
            if(court.court_name === data.court_name) {
                data.court_id = court.id;
            }
        });
        const userRepository = new UserRepositoryPrisma();
        const userService = new GetUserService(userRepository);
        const user = await userService.findByEmail(data.responsible_person_email);
        data.responsible_person_id = user.id;
        return await this.courtRepository.create(data);
    }
}