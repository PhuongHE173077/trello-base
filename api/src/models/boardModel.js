import { GET_DB } from "~/config/mongodb"
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from "./validators"
import { ObjectId } from "mongodb"
import { BOARD_TYPES } from "~/utils/constants"
import { columnModal } from "./columnModal"
import { cardModal } from "./cardModal"

const Joi = require("joi")

const BOARD_COLLECTION_NAME = 'boards'
const BOARD_COLECTION_SCHEMA = Joi.object({
  title: Joi.string().min(3).max(50).trim().strict(),
  slug: Joi.string().min(3).trim().strict(),
  description: Joi.string().min(5).max(255).trim().strict().required(),
  type: Joi.string().valid(BOARD_TYPES.PUBLIC, BOARD_TYPES.PRIVATE).required(),

  columnOrderIds: Joi.array().items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)).default([]),

  createdAt: Joi.date().timestamp('javascript').default(Date.now),

  _destroy: Joi.boolean().default(false)
})

const validateBeforeCreate = async (data) => {
  return await BOARD_COLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}

const createNewBoard = async (data) => {
  try {
    const validData = await validateBeforeCreate(data)
    return await GET_DB().collection(BOARD_COLLECTION_NAME).insertOne(validData)
  } catch (error) {
    throw new Error(error)
  }
}

const findOneById = async (id) => {
  try {
    return await GET_DB().collection(BOARD_COLLECTION_NAME).findOne({ _id: new ObjectId(id) })
  } catch (error) {
    throw new Error(error)
  }
}

const getDetail = async (id) => {
  try {
    try {
      const result = await GET_DB().collection(BOARD_COLLECTION_NAME).aggregate([
        {
          $match: {
            _id: new ObjectId(id),
            _destroy: false
          }
        },
        {
          $lookup: {
            from: columnModal.COLUMN_COLLECTION_NAME,
            localField: '_id',
            foreignField: 'boardId',
            as: 'columns'
          }
        },
        {
          $lookup: {
            from: cardModal.CARD_COLLECTION_NAME,
            localField: '_id',
            foreignField: 'boardId',
            as: 'cards'
          }
        }
      ]).toArray()
      return result[0] || null
    } catch (error) {
      throw new Error(error)
    }
  } catch (error) {
    throw new Error(error)
  }
}


const pushColumnOrderIds = async (column) => {
  try {
    const result = await GET_DB().collection(BOARD_COLLECTION_NAME).findOneAndUpdate(
      { _id: new ObjectId(column.boardId) },
      { $push: { columnOrderIds: new ObjectId(column._id) } },
      { returnDocument: 'after' }
    )
    return result.value
  } catch (error) {
    throw new Error(error)
  }
}

export const boardModal = {
  BOARD_COLLECTION_NAME,
  BOARD_COLECTION_SCHEMA,
  createNewBoard,
  findOneById,
  getDetail,
  pushColumnOrderIds
}