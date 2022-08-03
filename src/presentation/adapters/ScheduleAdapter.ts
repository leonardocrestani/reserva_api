import { ScheduleModel } from "../../application/models";

// REVER PARA TIRAR O ANY E RECEBER AS PROPRIEDADES CORRETAS
export default class ScheduleAdapter {
    static create(
        placeCourtName: string,
        courtName: string,
        hour: number,
        day: string,
        isRent: boolean,
        responsiblePersonEmail: string | null,
        responsiblePersonId: string | null,
        responsiblePersonFullName: string | null,
        courtId: string,
        id?: string
    ) {
        return new ScheduleModel(placeCourtName, courtName, hour, day, isRent, responsiblePersonEmail, responsiblePersonId, responsiblePersonFullName, courtId, id);
    }
}