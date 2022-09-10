export interface UpdateUser {
    update: (email: string, data: any) => Promise<void>;
}
