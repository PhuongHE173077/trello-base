import { ObjectId } from "mongodb"
import { GET_DB } from "~/config/mongodb"

const Joi = require("joi")
const { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } = require("./validators")

const CARD_COLLECTION_NAME = 'cards'
const CARD_COLLECTION_SCHEMA = Joi.object({
  boardId: Joi.string().min(3).max(50).pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE).required(),
  columnId: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE).required(),

  title: Joi.string().min(3).max(50).trim().strict().required(),
  description: Joi.string().min(5).max(250).trim().strict(),

  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)

})

const validateBeforeCreate = async (data) => {
  return await CARD_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}

const createNewCard = async (data) => {
  try {
    const validData = await validateBeforeCreate(data)
    const newObject = {
      ...validData,
      boardId: new ObjectId(validData.boardId),
      columnId: new ObjectId(validData.columnId)
    }
    return await GET_DB().collection(CARD_COLLECTION_NAME).insertOne(newObject)
  } catch (error) {
    throw new Error(error)
  }
}

const findOneById = async (id) => {
  try {
    return await GET_DB().collection(CARD_COLLECTION_NAME).findOne({ _id: new ObjectId(id) })
  } catch (error) {
    throw new Error(error)
  }
}

const update = async (cardId, updatedData) => {
  try {

    if (updatedData.columnId) updatedData.columnId = new ObjectId(updatedData.columnId)
    const result = await GET_DB().collection(CARD_COLLECTION_NAME).findOneAndUpdate(
      { _id: new ObjectId(cardId) },
      { $set: updatedData },
      { returnDocument: 'after' }
    )
    return result.value
  } catch (error) {
    throw new Error(error)
  }

}

const deleteCardInColumn = async (columnId) => {
  try {
    return await GET_DB().collection(CARD_COLLECTION_NAME).deleteMany({ columnId: new ObjectId(columnId) })
  } catch (error) {
    throw new Error(error)
  }

}

export const cardModal = {
  CARD_COLLECTION_NAME,
  CARD_COLLECTION_SCHEMA,
  createNewCard,
  findOneById,
  update,
  deleteCardInColumn
}