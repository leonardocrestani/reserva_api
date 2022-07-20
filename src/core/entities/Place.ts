import { Court } from "./";

export type Address = {
    city_code: number,
    city_name: string,
    state: string,
    country: string,
    street: string,
    neighborhood: string
}

export type Contact = {
    name: string
    phone_number: string
}

export type Operation_Time = {
    open_hour: number
    close_hour: number
    days_open: Array<string>
}

export class Place {

    constructor(
        public place_name: string,
        public cnpj: string,
        public number_of_courts: number,
        public address: Address,
        public contact: Contact,
        public operation_time: Operation_Time,
        public courts: Array<Court>,
        public id?: string
    ) { }

    static isOpen(days_open: Array<string>, close_hour: number, open_hour: number) {
        const currentHour = new Date().getHours();
        const [currentDay] = new Date().toDateString().split(' ');
        if (days_open.some(day => day === currentDay)) {
            if (currentHour < close_hour && currentHour > open_hour) {
                if (currentHour === close_hour && currentHour == open_hour) {
                    return true;
                }
            }
        }
        else {
            return false;
        }
    }
}