import { StatusCodes } from "http-status-codes"
import { boardModal } from "~/models/boardModel"
import { columnModal } from "~/models/columnModal"
import ApiError from "~/utils/ApiError"

const createNewColumn = async (reqBody) => {
  try {
    const newColumn = {
      ...reqBody
    }

    const createdColumn = await columnModal.createNewColumn(newColumn)

    const getNewColumn = await columnModal.findOneById(createdColumn.insertedId)

    if (getNewColumn) {
      getNewColumn.cards = []

      await boardModal.pushColumnOrderIds(getNewColumn)
    }

    return getNewColumn
  } catch (error) {
    throw new ApiError(StatusCodes.BAD_GATEWAY, error.message)
  }
}


export const columnService = {
  createNewColumn
}