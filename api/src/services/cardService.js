
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

const update = async (cardId, reqBody, cardCoverFile, userInfor, cardDeleteDueDate) => {
  try {

    const updatedCard = {
      ...reqBody,
      updatedAt: Date.now()
    }
    let getNewCard
    if (cardCoverFile) {
      const resultUpload = await cloudinaryProvider.streamUpload(cardCoverFile.buffer, 'cards')

      getNewCard = await cardModal.update(cardId, { cover: resultUpload.secure_url })
    } else if (updatedCard.commentToAdd) {

      const commentToAdd = {
        ...updatedCard.commentToAdd,
        createdAt: Date.now(),
        userId: userInfor._id,
        userEmail: userInfor.email
      }
      getNewCard = await cardModal.unshiftNewComment(cardId, commentToAdd)
    }
    else if (updatedCard.incomingMemberInfor) {
      getNewCard = await cardModal.updateMember(cardId, updatedCard.incomingMemberInfor)
    }

    else if (cardDeleteDueDate) {
      getNewCard = await cardModal.deleteDueDate(cardId)
    }

    else {
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
