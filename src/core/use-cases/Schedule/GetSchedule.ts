export interface GetSchedule {
    find: (place_name: string, court_name: string, hour: number, minutes: number) => Promise<object>
}