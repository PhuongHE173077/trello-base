

import express from 'express'
import { env } from './config/environment'
import { CONNECT_DB } from './config/mongodb'
import { APIs_V1 } from './routes/v1'
import { errorHandlingMiddleware } from './middlewares/erroHandlingMiddlewares'
import { corsOptions } from './config/cors'
import cookieParser from 'cookie-parser'
var cors = require('cors')

const START_SERVER = () => {
  const app = express()

  app.use(cookieParser())

  const hostname = env.APP_HOST
  const port = env.APP_POST

  app.use(cors(corsOptions))

  app.use(express.json())

  app.use('/v1', APIs_V1)

  //middleware erro (allways in last)
  app.use(errorHandlingMiddleware)

  app.listen(port, hostname, () => {
    // eslint-disable-next-line no-console
    console.log(`Hello ${env.AUTHOR}, I am running at http://${hostname}:${port}/`)
  })
}

CONNECT_DB()
  .then(() =>
    // eslint-disable-next-line no-console
    console.log('Connected database successfully !'))
  .then(() => START_SERVER())
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.log(error)
    process.exit(0)
  })


