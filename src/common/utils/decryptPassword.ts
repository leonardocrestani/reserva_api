import bcrypt from 'bcrypt';

export default async function encryptPassword(user: any, password: string) {
    const match = await bcrypt.compare(password, user.password);
    return match
}