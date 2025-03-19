import { ObjectId } from "mongodb"
import { GET_DB } from "~/config/mongodb"
import { boardModal } from "./boardModel"
import { FAVORITE_UPDATE_STATUS } from "~/utils/constants"

const Joi = require("joi")
const { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } = require("./validators")

const FAVORITE_COLLECTION_NAME = 'favorites'
const FAVORITE_COLLECTION_SCHEMA = Joi.object({
  userId: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE).required(),
  favoriteBoards: Joi.array().items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)).default([]),

  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null)
})

const getBoardsFavorite = async (userId) => {

  const condition = [
    { userId: new ObjectId(userId) },
    { favoriteBoards: { $exists: true } },
  ]
  const result = await GET_DB().collection(FAVORITE_COLLECTION_NAME).aggregate([
    { $match: { $and: condition } },
    {
      $lookup: {
        from: boardModal.BOARD_COLLECTION_NAME,
        localField: 'favoriteBoards',
        foreignField: '_id',
        as: 'favoriteBoards'
      }
    }
  ]
  ).toArray()
  return result[0] || []
}

const findFavoriteBoardByUserId = async (userId) => {
  try {
    return await GET_DB().collection(FAVORITE_COLLECTION_NAME).findOne({ userId: new ObjectId(userId) })
  } catch (error) {
    throw new Error(error)
  }
}

const update = async (favId, boardId, type) => {
  try {
    let optionType = {}
    if (type === FAVORITE_UPDATE_STATUS.PULL) {
      optionType = { $pull: { favoriteBoards: new ObjectId(boardId) } }
    } else {
      optionType = { $push: { favoriteBoards: new ObjectId(boardId) } }
    }

    const result = await GET_DB().collection(FAVORITE_COLLECTION_NAME).findOneAndUpdate(
      {
        _id: new ObjectId(favId)
      },
      optionType,
      { returnDocument: 'after' }
    )
    return await getBoardsFavorite(result.value.userId)
  } catch (error) {
    throw new Error(error)
  }
}

export const favoriteModal = {
  FAVORITE_COLLECTION_NAME,
  FAVORITE_COLLECTION_SCHEMA,
  getBoardsFavorite,
  findFavoriteBoardByUserId,
  update
}