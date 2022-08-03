import { BookSchedule } from '../../../core/use-cases/Schedule/BookSchedule';
import { ScheduleRepository } from '../../repository/ScheduleRepository';
import { FindPlaceService, FindUserService, } from "../";
import { PlaceRepository, UserRepository } from '../../repository';
import { BadRequest, Conflict, NotFound } from '../../errors';

export class BookScheduleService implements BookSchedule {
    constructor(
        private readonly scheduleRepository: ScheduleRepository,
        private readonly userRepository: UserRepository
    ) { }

    async update(id: string, data: any): Promise<void> {
        const schedule = await this.scheduleRepository.findById(id);
        if (!schedule) {
            throw new NotFound("Horario nao encontrado");
        }
        if (schedule.is_rent === true) {
            throw new Conflict("Horario ja reservado");
        }
        data.is_rent = true;
        const getUserService = new FindUserService(this.userRepository);
        const user = await getUserService.findByEmail(data.responsible_person_email);
        data.responsible_person_id = user.id;
        const fullName = user.first_name.concat(' ', `${user.last_name}`);
        data.responsible_person_full_name = fullName;
        await this.scheduleRepository.update(id, data);
    }
}