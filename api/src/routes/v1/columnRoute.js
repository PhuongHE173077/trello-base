import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { columnController } from '~/controllers/columnController'
import { columnValidation } from '~/validations/columnValidation'

const Router = express.Router()

Router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: 'get columns successfully !' })
  })
  .post(columnValidation.createNewColumn, columnController.createNewColumn)

Router.route('/:id')
  .put(columnValidation.update, columnController.update)
  .delete(columnValidation.deleteItem, columnController.deleteItem)
export const columnRoutes = Router