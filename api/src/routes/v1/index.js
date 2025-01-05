import express from 'express'
import { boardRoutes } from './boardRoute'

const Router = express.Router()

Router.get('/status', (req, res) => {
  res.status(200).json({ message: 'Api v1 is ready' })
})

Router.use('/boards', boardRoutes)

export const APIs_V1 = Router