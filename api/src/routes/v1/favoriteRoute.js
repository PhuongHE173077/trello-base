import express from 'express'
import { favoriteController } from '~/controllers/favoriteController'
import { authMiddlewares } from '~/middlewares/authMiddlewares'

const Router = express.Router()

Router.route('/')
  .get(authMiddlewares.isAuthorized, favoriteController.getBoardFavorite)
  .put(authMiddlewares.isAuthorized, favoriteController.update)

export const favoriteRoutes = Router