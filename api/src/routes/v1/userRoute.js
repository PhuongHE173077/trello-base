import express from 'express'
import { userController } from '~/controllers/userController'
import { userValidation } from '~/validations/userValidation'

const Router = express.Router()

Router.route('/register')
  .post(userValidation.createNew, userController.createNew)

Router.route('/verify')
  .put(userValidation.verifityAccount, userController.verifityAccount)

Router.route('/login')
  .post(userValidation.login, userController.login)
export const userRoutes = Router