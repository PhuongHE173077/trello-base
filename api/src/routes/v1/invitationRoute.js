import express from 'express'
import { invitationController } from '~/controllers/invitationController'
import { authMiddlewares } from '~/middlewares/authMiddlewares'
import { invatiationValidation } from '~/validations/invitationValidation'


const Router = express.Router()


Router.route('/board')
  .post(
    authMiddlewares.isAuthorized,
    invatiationValidation.createNewInvatation,
    invitationController.createNew)


export const invitationRoutes = Router

