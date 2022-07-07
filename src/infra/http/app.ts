import express from 'express';
import morgan from 'morgan';
import { errors } from 'celebrate';
import { router } from './routes/routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(router);
app.use(errors());

export { app };