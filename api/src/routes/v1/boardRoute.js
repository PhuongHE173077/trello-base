import express from 'express'
import { boardController } from '~/controllers/boardController'
import { authMiddlewares } from '~/middlewares/authMiddlewares'
import { boardValidation } from '~/validations/boardValidation'


const Router = express.Router()


Router.route('/')
  .get(authMiddlewares.isAuthorized, boardController.getBoards)
  .post(authMiddlewares.isAuthorized, boardValidation.createNewBoard, boardController.createNewBoard)


Router.route('/:id')
  .get(authMiddlewares.isAuthorized, boardController.getDetail)
  .put(authMiddlewares.isAuthorized, boardValidation.update, boardController.update)


//API move card in diferent column
Router.route('/supports/moving_cards')


  .put(authMiddlewares.isAuthorized, boardValidation.moveCardToDifferentColumn, boardController.moveCardToDifferentColumn)


export const boardRoutes = Router

