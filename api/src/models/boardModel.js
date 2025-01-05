import { GET_DB } from "~/config/mongodb"
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from "./validators"

const Joi = require("joi")

const BOARD_COLLECTION_NAME = 'boards'
const BOARD_COLECTION_SCHEMA = Joi.object({
  title: Joi.string().min(3).max(50).trim().strict(),
  slug: Joi.string().min(3).trim().strict(),
  description: Joi.string().min(5).max(255).trim().strict().required(),

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
    return await GET_DB().collection(BOARD_COLLECTION_NAME).findOne({ _id: id })
  } catch (error) {
    throw new Error(error)
  }
}

export const boardModal = {
  BOARD_COLLECTION_NAME,
  BOARD_COLECTION_SCHEMA,
  createNewBoard,
  findOneById
}