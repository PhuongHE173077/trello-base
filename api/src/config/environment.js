import 'dotenv/config'

export const env = {
  MONGODB_URI: process.env.MONGODB_URI,
  MONGODB_DATABASE: process.env.MONGODB_DATABASE,

  APP_HOST: process.env.APP_HOST,
  APP_POST: process.env.APP_POST,

  BUILD_MODE: process.env.BUILD_MODE,

  AUTHOR: process.env.AUTHOR,

  MAIL_ACCOUNT: process.env.MAIL_ACCOUNT,
  MAIL_PASSWORD: process.env.MAIL_PASSWORD
}