import { BookSchedule } from '../../../core/use-cases/Schedule/BookSchedule';
import { ScheduleRepository } from '../../repository/ScheduleRepository';
import { GetCourtService } from '../Court/GetCourtService';
import { CourtRepositoryPrisma } from '../../../infra/repository/Court/CourtRepositoryPrisma';
import { UserRepositoryPrisma } from "../../../infra/repository/User/UserRepositoryPrisma";
import { GetUserService } from "../";

export class BookScheduleService implements BookSchedule {
    constructor(private readonly scheduleRepository: ScheduleRepository) { }

    async update(court_name: string, place_name: string, hour: number, minutes: number, data: any): Promise<void> {
        const courtRepository = new CourtRepositoryPrisma();
        const getCourtService = new GetCourtService(courtRepository);
        const { id: court_id } = await getCourtService.find(place_name, court_name);
        const { id: schedule_id } = await this.scheduleRepository.find(court_id, hour, minutes);
        const userRepository = new UserRepositoryPrisma();
        const getUserService = new GetUserService(userRepository);
        const user = await getUserService.findByEmail(data.responsible_person_email);
        data.responsible_person_id = user.id;
        const fullName = user.first_name.concat(' ', `${user.last_name}`);
        data.responsible_person_full_name = fullName;
        await this.scheduleRepository.update(schedule_id, data);
    }
}