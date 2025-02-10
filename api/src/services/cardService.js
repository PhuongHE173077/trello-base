import { StatusCodes } from "http-status-codes"
import { cardModal } from "~/models/cardModal"
import { columnModal } from "~/models/columnModal"
import { cloudinaryProvider } from "~/providers/CloudinaryProvider"
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

const update = async (cardId, reqBody, cardCoverFile) => {
  try {

    const updatedCard = {
      ...reqBody,
      updatedAt: Date.now()
    }
    let getNewCard
    if (cardCoverFile) {
      const resultUpload = await cloudinaryProvider.streamUpload(cardCoverFile.buffer, 'cards')

      getNewCard = await cardModal.update(cardId, { cover: resultUpload.secure_url })
    } else {
      getNewCard = await cardModal.update(cardId, updatedCard)

    }

    return getNewCard
  } catch (error) {
    throw new ApiError(StatusCodes.BAD_GATEWAY, error.message)
  }
}


export const cardService = {
  createNewCard,
  update
}