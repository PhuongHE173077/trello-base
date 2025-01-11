import { StatusCodes } from "http-status-codes"
import { ObjectId } from "mongodb"
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

const update = async (columnId, reqBody) => {
  try {

    const updatedColumn = {
      ...reqBody,
      updatedAt: Date.now
    }

    return await columnModal.update(columnId, updatedColumn)
  } catch (error) {
    throw new ApiError(StatusCodes.BAD_GATEWAY, error.message)
  }
}

export const columnService = {
  createNewColumn,
  update
}