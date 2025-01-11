import { StatusCodes } from "http-status-codes"
import { ObjectId } from "mongodb"
import { boardModal } from "~/models/boardModel"
import { cardModal } from "~/models/cardModal"
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

const deleteItem = async (columnId) => {
  try {

    const tagetColumn = await columnModal.findOneById(columnId)
    if (!tagetColumn) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Colum not found")
    }

    //delete column 
    await columnModal.deleteColumn(columnId)

    //delete card in column
    await cardModal.deleteCardInColumn(columnId)

    //update orderColumIds
    await boardModal.pullOrderColummIds(tagetColumn)

    return { deleteResult: 'Delete successfully !' }
  } catch (error) {
    throw new ApiError(StatusCodes.BAD_GATEWAY, error.message)
  }
}

export const columnService = {
  createNewColumn,
  update,
  deleteItem
}