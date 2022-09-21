import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import databaseConfig from '../database'
import corsMiddleware from './middlewares/corsMiddleware'
import { router } from './routes/routes'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from '../../../swagger.json'

const app = express()

mongoose.connect(databaseConfig.URL)
mongoose.connection.once('open', () => { console.log('Connected DB') }).on('error', (error) => { console.log(error.message) })
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev', { skip: (req, res) => process.env.NODE_ENV === '' }))
app.use(corsMiddleware)
app.use(router)

export { app }
