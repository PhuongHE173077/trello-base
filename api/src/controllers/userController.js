import { StatusCodes } from "http-status-codes"
import { userService } from "~/services/userService"

const createNew = async (req, res, next) => {
  try {
    const createBoard = await userService.createNew(req)

    res.status(StatusCodes.CREATED).json(createBoard)
  } catch (error) {
    next(error)
  }
}
const login = async (req, res, next) => {
  try {
    const createBoard = await userService.login(req.body)

    res.status(StatusCodes.CREATED).json(createBoard)
  } catch (error) {
    next(error)
  }
}
const verifityAccount = async (req, res, next) => {
  try {
    const createBoard = await userService.verifityAccount(req.body)

    res.status(StatusCodes.CREATED).json(createBoard)
  } catch (error) {
    next(error)
  }
}

export const userController = {
  createNew,
  login,
  verifityAccount
}