import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { cardConroller } from '~/controllers/cardConroller'
import { cardValidation } from '~/validations/cardValidation'

const Router = express.Router()

Router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: 'get columns successfully !' })
  })
  .post(cardValidation.createNewCard, cardConroller.createNewCard)

export const cardRoutes = Router