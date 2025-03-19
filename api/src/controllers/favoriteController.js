import { StatusCodes } from "http-status-codes"
import { favoriteService } from "~/services/favoriteService"

const getBoardFavorite = async (req, res, next) => {
  try {
    const userId = req.jwtDecoded._id
    const boards = await favoriteService.getBoardFavorite(userId)

    res.status(StatusCodes.OK).json(boards)
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  try {
    const userId = req.jwtDecoded._id
    const boardId = req.body.boardId

    const boards = await favoriteService.update(userId, boardId)

    res.status(StatusCodes.OK).json(boards)
  } catch (error) {
    next(error)
  }
}
export const favoriteController = {
  getBoardFavorite,
  update
}