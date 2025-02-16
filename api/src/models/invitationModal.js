import { ObjectId } from "mongodb"
import { GET_DB } from "~/config/mongodb"
import { BOARD_INVITATION_STATUS, BOARD_TYPES, INVITATION_TYPE } from "~/utils/constants"
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from "./validators"


const Joi = require("joi")


const INVITATION_COLLECTION_NAME = 'invitations'
const INVITATION_COLLECTION_SCHEMA = Joi.object({
  inviterId: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE).required(),
  inviteeId: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE).required(),

  type: Joi.string().valid(...Object.values(INVITATION_TYPE)).required(),

  boardInvatation: Joi.object({
    boardId: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE).required(),
    status: Joi.string().valid(...Object.values(BOARD_INVITATION_STATUS)).required()
  }).optional(),

  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null)

})


const INVALID_UPDATE_FILEDS = ['_id', 'inviterId', 'inviteeId', 'createdAt']


const validateBeforeCreate = async (data) => {
  return await INVITATION_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}


const createNewInvitation = async (data) => {
  try {
    const validData = await validateBeforeCreate(data)

    const newInvitationData = {
      ...validData,
      inviterId: new ObjectId(validData.inviterId),
      inviteeId: new ObjectId(validData.inviteeId),
      boardInvatation: {
        boardId: new ObjectId(validData.boardInvatation.boardId),
        status: validData.boardInvatation.status
      }
    }

    return await GET_DB().collection(INVITATION_COLLECTION_NAME).insertOne(newInvitationData)
  } catch (error) {
    throw new Error(error)
  }
}


const findOneById = async (id) => {
  try {
    return await GET_DB().collection(INVITATION_COLLECTION_NAME).findOne({ _id: new ObjectId(id) })
  } catch (error) {
    throw new Error(error)
  }
}



export const invitationModal = {
  INVITATION_COLLECTION_NAME,
  INVITATION_COLLECTION_SCHEMA,
  createNewInvitation,
  findOneById
}