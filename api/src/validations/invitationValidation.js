import { StatusCodes } from "http-status-codes"
import Joi from "joi"
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from "~/models/validators"
import ApiError from "~/utils/ApiError"
import { EMAIL_RULE, EMAIL_RULE_MESSAGE } from "~/utils/validators"

const createNewInvatation = async (req, res, next) => {

  const schema = Joi.object({
    inviteeEmail: Joi.string().pattern(EMAIL_RULE).message(EMAIL_RULE_MESSAGE).required(),
    boardId: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE).required()
  })

  try {
    await schema.validateAsync(req.body, { abortEarly: false, allowUnknown: true })
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error.message))
  }
}

export const invatiationValidation = {
  createNewInvatation
}