import dotenv from 'dotenv';
dotenv.config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});
import { app } from './app';

app.listen(process.env.API_PORT, () => {
    console.log(`listening on port ${process.env.API_PORT}`);
});