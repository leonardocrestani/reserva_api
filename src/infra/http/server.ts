import dotenv from 'dotenv'
import { app } from './app'
dotenv.config({
  path: process.env.NODE_ENV === 'local' ? '.env.local' : '.env'
})

app.listen(process.env.API_PORT, () => {
  console.log(`listening on port ${process.env.API_PORT}`)
})
