import { PlaceModel, CourtModel } from "../../application/models";
import { Address, Contact, Operation_Time } from "../../core/entities";
// REVER PARA TIRAR O ANY E RECEBER AS PROPRIEDADES CORRETAS
export default class PlaceAdapter {
    static create(
        placeName: string,
        cnpj: string,
        numberOfCourts: number,
        address: Address,
        contact: Contact,
        operationTime: Operation_Time,
        courts: Array<CourtModel>,
        id?: string
    ) {
        return new PlaceModel(placeName, cnpj, numberOfCourts, address, contact, operationTime, courts, id);
    }
}