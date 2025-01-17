import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { cardConroller } from '~/controllers/cardConroller'
import { authMiddlewares } from '~/middlewares/authMiddlewares'
import { cardValidation } from '~/validations/cardValidation'

const Router = express.Router()

Router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: 'get columns successfully !' })
  })
  .post(authMiddlewares.isAuthorized, cardValidation.createNewCard, cardConroller.createNewCard)

export const cardRoutes = Router