import express from 'express'
import { boardRoutes } from './boardRoute'
import { columnRoutes } from './columnRoute'
import { cardRoutes } from './cardRoute'

const Router = express.Router()

Router.get('/status', (req, res) => {
  res.status(200).json({ message: 'Api v1 is ready' })
})

Router.use('/boards', boardRoutes)

Router.use('/columns', columnRoutes)

Router.use('/cards', cardRoutes)

export const APIs_V1 = Router