export type Address = {
    city_code: number,
    city_name: string,
    state: string,
    country: string,
    street: string,
    neighbourhood: string
}

export type Contact = {
    name: string
    phone_number: string
}

export type Operation_Time = {
    open_hour: number
    open_minutes: number
    close_hour: number
    close_minutes: number
    days: Array<string>
}

export class Place {

    constructor(
        public local_name: string,
        public number_of_courts: number,
        public address: Address,
        public contact: Contact,
        public operation_time: Operation_Time
    ) { }

    isOpen() {
        const currentHour = new Date().getHours();
        const currentMinutes = new Date().getMinutes();
        const [currentDay] = new Date().toDateString().split(' ');
        if (this.operation_time.days.some(day => day === currentDay)) {
            if (currentHour < this.operation_time.close_hour && currentHour > this.operation_time.open_hour) {
                if (currentHour === this.operation_time.close_hour && currentHour == this.operation_time.open_hour) {
                    if (currentMinutes < this.operation_time.close_minutes && currentMinutes > this.operation_time.open_minutes) {
                        return true;
                    }
                }
            }
        }
        else {
            return false;
        }
    }
}