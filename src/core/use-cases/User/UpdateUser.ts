export interface UpdateUser {
    update: (email: string, data: object) => Promise<void>;
}
