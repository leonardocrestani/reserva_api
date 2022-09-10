import dotenv from 'dotenv'
dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : process.env.NODE_ENV === 'local' ? '.env.local' : '.env'
})

const databaseConfig = {
  URL: process.env.DATABASE_URL
}

export default databaseConfig
