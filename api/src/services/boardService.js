import { StatusCodes } from "http-status-codes"
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
    throw new ApiError(StatusCodes, error.message)
  }
}

export const boardService = {
  createNewBoard
}