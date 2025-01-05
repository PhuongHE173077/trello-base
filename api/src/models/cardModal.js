const Joi = require("joi")
const { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } = require("./validators")

const CARD_COLLECTION_NAME = 'cards'
const CARD_COLLECTION_SCHEMA = Joi.object({
  boardId: Joi.string().min(3).max(50).pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE).required(),
  columnId: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE).required(),

  title: Joi.string().min(3).max(50).trim().strict().required(),
  description: Joi.string().min(5).max(250).trim().strict().required(),

  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)

})

export const cardModal = {
  CARD_COLLECTION_NAME,
  CARD_COLLECTION_SCHEMA
}