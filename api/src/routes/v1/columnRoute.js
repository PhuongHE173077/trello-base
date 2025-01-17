import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { columnController } from '~/controllers/columnController'
import { authMiddlewares } from '~/middlewares/authMiddlewares'
import { columnValidation } from '~/validations/columnValidation'

const Router = express.Router()

Router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: 'get columns successfully !' })
  })
  .post(authMiddlewares.isAuthorized, columnValidation.createNewColumn, columnController.createNewColumn)

Router.route('/:id')
  .put(authMiddlewares.isAuthorized, columnValidation.update, columnController.update)
  .delete(authMiddlewares.isAuthorized, columnValidation.deleteItem, columnController.deleteItem)
export const columnRoutes = Router