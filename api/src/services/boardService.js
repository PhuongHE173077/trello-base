import { StatusCodes } from "http-status-codes"
import { cloneDeep } from "lodash"
import { boardModal } from "~/models/boardModel"
import ApiError from "~/utils/ApiError"
import { slugify } from "~/utils/slugify"

const createNewBoard = async (reqBody) => {
  try {
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }

    const createdBoard = await boardModal.createNewBoard(newBoard)

    const getNewBoard = await boardModal.findOneById(createdBoard.insertedId)

    return getNewBoard
  } catch (error) {
    throw new ApiError(StatusCodes.BAD_GATEWAY, error.message)
  }
}

const getDetail = async (boardId) => {
  try {
    const board = await boardModal.getDetail(boardId)
    if (!board) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'The Board Not found')
    }
    const resBoard = cloneDeep(board)

    resBoard.columns.forEach(col => {
      col.cards = resBoard.cards.filter(card => col._id.toString() === card.columnId.toString())
    })

    delete resBoard.cards

    return resBoard
  } catch (error) {
    throw new ApiError(StatusCodes.BAD_GATEWAY, error.message)
  }
}

const update = async (boardId, data) => {
  try {
    const updatedData = {
      ...data,
      updatedAt: Date.now()
    }

    const board = await boardModal.update(boardId, updatedData)
    return board
  } catch (error) {
    throw new Error(error)
  }

}

export const boardService = {
  createNewBoard,
  getDetail,
  update
}