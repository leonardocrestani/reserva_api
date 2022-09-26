export interface BookSchedule {
    update: (id: string, data: object) => Promise<void>
}
