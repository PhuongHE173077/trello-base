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

const moveCardToDifferentColumn = async (req, res, next) => {
  try {
    const result = await boardService.moveCardToDifferentColumn(req.body)

    res.status(StatusCodes.OK).json(result)
  } catch (error) {
    next(error)
  }
}

const getBoards = async (req, res, next) => {
  try {
    const userId = req.jwtDecoded._id

    const { page, itemsPerPage } = req.query

    const result = await boardService.getBoards(userId, page, itemsPerPage)

    res.status(StatusCodes.OK).json(result)
  } catch (error) {
    next(error)
  }
}
export const boardController = {
  createNewBoard,
  getDetail,
  update,
  moveCardToDifferentColumn,
  getBoards
}