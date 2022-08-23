import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import databaseConfig from '../database';
import { router } from './routes/routes';

const app = express();

mongoose.connect(databaseConfig.URL);
mongoose.connection.once('open', () => { console.log('Connected DB') }).on('error', (error) => { console.log(error.message); });
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(router);

export { app };