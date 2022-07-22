import { BookSchedule } from '../../../core/use-cases/Schedule/BookSchedule';
import { ScheduleRepository } from '../../repository/ScheduleRepository';
import { GetCourtService } from '../Court/GetCourtService';
import { CourtRepositoryPrisma } from '../../../infra/repository/Court/CourtRepositoryPrisma';
import { UserRepositoryPrisma } from "../../../infra/repository/User/UserRepositoryPrisma";
import { GetPlaceService, GetUserService, } from "../";
import { CourtRepository, PlaceRepository, UserRepository } from '../../repository';
import { BadRequest, NotFound } from '../../errors';

export class BookScheduleService implements BookSchedule {
    constructor(
        private readonly scheduleRepository: ScheduleRepository,
        private readonly courtRepository: CourtRepository,
        private readonly placeRepository: PlaceRepository,
        private readonly userRepository: UserRepository
    ) { }

    async update(place_name: string, court_name: string, hour: number, data: any): Promise<void> {
        if (!data.is_rent) {
            throw new BadRequest('Esta reservado nao pode ser falso');
        }
        const getPlaceService = new GetPlaceService(this.placeRepository);
        const place = await getPlaceService.findByName(place_name);
        const exist = place.courts.some((court: any) => {
            return court.court_name === court_name;
        });
        if (!exist) {
            throw new NotFound("Quadra nao encontrada");
        }
        place.courts.find((court) => {
            if (court.court_name === court_name) {
                const court_id = court.id;
            }
        });
        const schedule = await this.scheduleRepository.find(place_name, court_name, hour);
        if (!schedule) {
            throw new NotFound("Horario nao encontrado");
        }
        const { id: schedule_id } = await this.scheduleRepository.find(place_name, court_name, hour);
        const getUserService = new GetUserService(this.userRepository);
        const user = await getUserService.findByEmail(data.responsible_person_email);
        data.responsible_person_id = user.id;
        const fullName = user.first_name.concat(' ', `${user.last_name}`);
        data.responsible_person_full_name = fullName;
        await this.scheduleRepository.update(hour, data);
    }
}