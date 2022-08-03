import bcrypt from 'bcrypt';

export default async function passwordValidator(user: any, password: string) {
    const match = await bcrypt.compare(password, user.password);
    return match;
}