import { StatusCodes } from "http-status-codes"
import { cloneDeep } from "lodash"
import { boardModal } from "~/models/boardModel"
import { cardModal } from "~/models/cardModal"
import { columnModal } from "~/models/columnModal"
import ApiError from "~/utils/ApiError"
import { DEFAULT_ITEMS_PER_PAGE, DEFAULT_PAGE } from "~/utils/constants"
import { slugify } from "~/utils/slugify"


const createNewBoard = async (userId, reqBody) => {
  try {
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }

    const createdBoard = await boardModal.createNewBoard(userId, newBoard)

    const getNewBoard = await boardModal.findOneById(createdBoard.insertedId)

    return getNewBoard
  } catch (error) {
    throw new ApiError(StatusCodes.BAD_GATEWAY, error.message)
  }
}

const getDetail = async (userId, boardId) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const board = await boardModal.getDetail(userId, boardId)
    if (!board) {
      throw new ApiError(StatusCodes.CONFLICT, 'The Board Not found')
    }
    const resBoard = cloneDeep(board)

    resBoard.columns.forEach(col => {
      col.cards = resBoard.cards.filter(card => col._id.toString() === card.columnId.toString())
    })

    delete resBoard.cards

    return resBoard
  } catch (error) {
    throw error
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

const moveCardToDifferentColumn = async (data) => {
  try {
    await columnModal.update(data.prevColumnId, { cardOrderIds: data.prevCardOrderIds })
    await columnModal.update(data.nextColumId, { cardOrderIds: data.nextCardOrderIds })

    await cardModal.update(data.currentCardId, { columnId: data.nextColumId })

    return { updatedResult: 'Succesfully ' }
  } catch (error) {
    throw new Error(error)
  }
}

const getBoards = async (userId, page, itemsPerPage, queryFilter) => {
  try {
    if (!page) page = DEFAULT_PAGE

    if (!itemsPerPage) itemsPerPage = DEFAULT_ITEMS_PER_PAGE

    //tranform page and itemsPerPage to number
    const boards = await boardModal.getBoards(userId, parseInt(page), parseInt(itemsPerPage), queryFilter)
    return boards
  } catch (error) {
    throw new Error(error)
  }
}


export const boardService = {
  createNewBoard,
  getDetail,
  update,
  moveCardToDifferentColumn,
  getBoards
}