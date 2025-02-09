import { StatusCodes } from "http-status-codes"
import { cardModal } from "~/models/cardModal"
import { columnModal } from "~/models/columnModal"
import ApiError from "~/utils/ApiError"
import { slugify } from "~/utils/slugify"

const createNewCard = async (reqBody) => {
  try {
    const newCard = {
      ...reqBody
    }

    const createdCard = await cardModal.createNewCard(newCard)

    const getNewCard = await cardModal.findOneById(createdCard.insertedId)
    if (getNewCard) {
      await columnModal.pushCardOrderIds(getNewCard)
    }
    return getNewCard
  } catch (error) {
    throw new ApiError(StatusCodes.BAD_GATEWAY, error.message)
  }
}

const update = async (cardId, reqBody) => {
  try {

    const updatedCard = {
      ...reqBody,
      updatedAt: Date.now()
    }

    const getNewCard = await cardModal.update(cardId, updatedCard)

    return getNewCard
  } catch (error) {
    throw new ApiError(StatusCodes.BAD_GATEWAY, error.message)
  }
}


export const cardService = {
  createNewCard,
  update
}