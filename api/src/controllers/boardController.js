import { StatusCodes } from "http-status-codes"
import { boardService } from "~/services/boardService"

const createNewBoard = async (req, res, next) => {

  try {
    const createBoard = await boardService.createNewBoard(req.body)

    res.status(StatusCodes.CREATED).json(createBoard)
  } catch (error) {
    next(error)
  }
}

const getDetail = async (req, res, next) => {

  try {
    const boardId = req.params.id

    const board = await boardService.getDetail(boardId)

    res.status(StatusCodes.OK).json(board)
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  try {
    const boardId = req.params.id


    const board = await boardService.update(boardId, req.body)

    res.status(StatusCodes.OK).json(board)
  } catch (error) {
    next(error)
  }
}

export const boardController = {
  createNewBoard,
  getDetail,
  update
}