enum States {
    AC,
    AL,
    AP,
    AM,
    BA,
    CE,
    DF,
    ES,
    GO,
    MA,
    MS,
    MT,
    MG,
    PA,
    PB,
    PR,
    PE,
    PI,
    RJ,
    RN,
    RS,
    RO,
    RR,
    SC,
    SP,
    SE,
    TO
}

enum Weekend_Days {
    SEGUNDA,
    TERCA,
    QUARTA,
    QUINTA,
    SEXTA,
    SABADO,
    DOMINGO
}


export type Address = {
    city_code: number,
    city_name: string,
    state: States,
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
    days: Array<Weekend_Days>
}

export class Place {

    constructor(
        local_name: string,
        number_of_courts: number,
        address: Address,
        contact: Contact,
        operation_time: Operation_Time
    ) { }
}