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

export const userController = {
  createNew
}