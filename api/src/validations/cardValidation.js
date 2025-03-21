
import { StatusCodes } from "http-status-codes"
import Joi from "joi"
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from "~/models/validators"
import ApiError from "~/utils/ApiError"

const createNewCard = async (req, res, next) => {

  const schema = Joi.object({
    boardId: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE).required(),
    columnId: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE).required(),
    title: Joi.string().min(3).max(50).trim().strict().required()
  })

  try {
    await schema.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error.message))
  }
}

const update = async (req, res, next) => {

  const schema = Joi.object({
    cardId: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
    title: Joi.string().min(3).max(50).trim().strict()
  })

  try {
    await schema.validateAsync(req.body, { abortEarly: false, allowUnknown: true })
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error.message))
  }
}

export const cardValidation = {
  createNewCard,
  update
}