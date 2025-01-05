//phuongdang
//xKs4Pum9zHbGtvsR

import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from './environment'

const MONGODB_URI = env.MONGODB_URI
const MONGODB_DATABASE = env.MONGODB_DATABASE

let trelloInstance = null

const mongoClient = new MongoClient(MONGODB_URI,
  {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true
    }
  })

export const CONNECT_DB = async () => {
  await mongoClient.connect()
  trelloInstance = mongoClient.db(MONGODB_DATABASE)

}

export const GET_DB = () => {
  if (!trelloInstance) throw new Error('Must connect to database ')
  return trelloInstance
}
