import express from 'express'
import { boardRoutes } from './boardRoute'
import { columnRoutes } from './columnRoute'
import { cardRoutes } from './cardRoute'
import { userRoutes } from './userRoute'
import { invitationRoutes } from './invitationRoute'
import { favoriteRoutes } from './favoriteRoute'

const Router = express.Router()

Router.get('/status', (req, res) => {
  res.status(200).json({ message: 'Api v1 is ready' })
})
//boards APIs
Router.use('/boards', boardRoutes)

//columns APIs
Router.use('/columns', columnRoutes)

//cards APIs
Router.use('/cards', cardRoutes)

//user APIs
Router.use('/users', userRoutes)

//invitation APIs
Router.use('/invitations', invitationRoutes)

//favorite APIs
Router.use('/favorites', favoriteRoutes)

export const APIs_V1 = Router