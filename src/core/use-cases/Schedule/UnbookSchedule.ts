export interface UnbookSchedule {
    update: (id: string, userEmail?: string) => Promise<void>
}
