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


//get invitations by user
Router.route('/')
  .get(
    authMiddlewares.isAuthorized,
    invitationController.getInvitations)


//update invitation
Router.route('/board/:id')
  .put(
    authMiddlewares.isAuthorized,
    invitationController.updateInvitation)

export const invitationRoutes = Router