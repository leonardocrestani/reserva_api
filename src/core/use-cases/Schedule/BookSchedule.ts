export interface BookSchedule {
    update: (id: string, data: any) => Promise<void>
}
