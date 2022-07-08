
export interface AuthenticateUser {
    execute: (email: string, password: string) => Promise<object>
}