import { ObjectId } from "mongodb"
import { GET_DB } from "~/config/mongodb"
import { CARD_MEMBER_ACTION, DUE_DATE_STATUS } from "~/utils/constants"
import { EMAIL_RULE, EMAIL_RULE_MESSAGE } from "~/utils/validators"

const Joi = require("joi")
const { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } = require("./validators")

const CARD_COLLECTION_NAME = 'cards'
const CARD_COLLECTION_SCHEMA = Joi.object({
  boardId: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE).required(),
  columnId: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE).required(),

  title: Joi.string().min(3).max(50).trim().strict().required(),
  description: Joi.string().min(5).max(250).trim().strict(),

  cover: Joi.string().default(null),
  memberIds: Joi.array().items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)).default([]),

  comments: Joi.array().items({
    userId: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
    userEmail: Joi.string().pattern(EMAIL_RULE).message(EMAIL_RULE_MESSAGE),
    userAvatar: Joi.string(),
    userDisplayName: Joi.string().min(3).max(50).trim().strict(),
    comment: Joi.string().min(5).max(250).trim().strict(),

    createdAt: Joi.date().timestamp()
  }).default([]),

  dueDate: Joi.object({
    startDate: Joi.string(),
    endDate: Joi.string(),
    status: Joi.string()
  }).optional(),

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

const unshiftNewComment = async (cardId, newComment) => {
  try {
    const result = await GET_DB().collection(CARD_COLLECTION_NAME).findOneAndUpdate(
      { _id: new ObjectId(cardId) },
      { $push: { comments: { $each: [newComment], $position: 0 } } },
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

const updateMember = async (cardId, updatedData) => {
  try {
    let optionType = {}
    if (updatedData.action === CARD_MEMBER_ACTION.REMOVE) {
      optionType = { $pull: { memberIds: new ObjectId(updatedData.userId) } }
    }

    if (updatedData.action === CARD_MEMBER_ACTION.ADD) {
      optionType = { $push: { memberIds: new ObjectId(updatedData.userId) } }
    }

    const result = await GET_DB().collection(CARD_COLLECTION_NAME).findOneAndUpdate(
      { _id: new ObjectId(cardId) },
      optionType,
      { returnDocument: 'after' }
    )

    return result.value
  } catch (error) {
    throw new Error(error)
  }

}

const deleteDueDate = async (cardId) => {
  try {
    const result = await GET_DB().collection(CARD_COLLECTION_NAME).findOneAndUpdate(
      { _id: new ObjectId(cardId) },
      {
        $unset: {
          "dueDate.startDate": "",
          "dueDate.endDate": "",
          "dueDate.status": ""
        }
      },

      { returnDocument: 'after' }
    )
    return result.value
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
  deleteCardInColumn,
  unshiftNewComment,
  updateMember,
  deleteDueDate
}