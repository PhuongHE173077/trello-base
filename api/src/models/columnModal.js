import { ObjectId, ReturnDocument } from "mongodb"
import { GET_DB } from "~/config/mongodb"
import { boardModal } from "./boardModel"

const Joi = require("joi")
const { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } = require("./validators")

const COLUMN_COLLECTION_NAME = 'columns'
const COLUMN_COLLECION_SCHEMA = Joi.object({
  boardId: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  title: Joi.string().min(3).max(50).trim().strict(),

  cardOrderIds: Joi.array().items(
    Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
  ).default([]),

  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)

})

const validateBeforeCreate = async (data) => {
  return await COLUMN_COLLECION_SCHEMA.validateAsync(data, { abortEarly: false })
}

const createNewColumn = async (data) => {
  try {
    const validData = await validateBeforeCreate(data)
    const newObject = {
      ...validData,
      boardId: new ObjectId(validData.boardId)
    }
    return await GET_DB().collection(COLUMN_COLLECTION_NAME).insertOne(newObject)
  } catch (error) {
    throw new Error(error)
  }
}

const findOneById = async (id) => {
  try {
    return await GET_DB().collection(COLUMN_COLLECTION_NAME).findOne({ _id: new ObjectId(id) })
  } catch (error) {
    throw new Error(error)
  }
}

const pushCardOrderIds = async (card) => {
  const result = await GET_DB().collection(COLUMN_COLLECTION_NAME).findOneAndUpdate(
    {
      _id: new ObjectId(card.columnId)
    },
    {
      $push: { cardOrderIds: new ObjectId(card._id) }
    },
    {
      returnDocument: 'after'
    }
  )
  return result.value
}

const update = async (columnId, updatedData) => {
  try {
    if (updatedData.cardOrderIds && updatedData.cardOrderIds.length > 0) {
      updatedData.cardOrderIds = updatedData.cardOrderIds.map(id => new ObjectId(id))
    }
    const result = await GET_DB().collection(COLUMN_COLLECTION_NAME).findOneAndUpdate(
      { _id: new ObjectId(columnId) },
      { $set: updatedData },
      { returnDocument: 'after' }
    )
    return result.value
  } catch (error) {
    throw new Error(error)
  }

}

const deleteColumn = async (columnId) => {
  try {
    return await GET_DB().collection(COLUMN_COLLECTION_NAME).deleteOne({ _id: new ObjectId(columnId) })
  } catch (error) {
    throw new Error(error)
  }

}

export const columnModal = {
  COLUMN_COLLECTION_NAME,
  COLUMN_COLLECION_SCHEMA,
  createNewColumn,
  findOneById,
  pushCardOrderIds,
  update,
  deleteColumn

}