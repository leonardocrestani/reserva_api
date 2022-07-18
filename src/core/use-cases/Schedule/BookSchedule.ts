export interface BookSchedule {
    update: (court_name: string, place_name: string, hour: number, minutes: number, data: any) => Promise<void>
}