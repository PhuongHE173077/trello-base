import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { cardConroller } from '~/controllers/cardConroller'
import { authMiddlewares } from '~/middlewares/authMiddlewares'
import { multerUploadMiddlewares } from '~/middlewares/multerUploadMiddlewares'
import { cardValidation } from '~/validations/cardValidation'

const Router = express.Router()

Router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: 'get columns successfully !' })
  })
  .post(authMiddlewares.isAuthorized, cardValidation.createNewCard, cardConroller.createNewCard)
Router.route('/:id')
  .put(authMiddlewares.isAuthorized,
    multerUploadMiddlewares.upload.single('cardCover'),
    cardValidation.update,
    cardConroller.update)

export const cardRoutes = Router