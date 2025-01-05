import { StatusCodes } from "http-status-codes"
import Joi from "joi"
import ApiError from "~/utils/ApiError"
import { BOARD_TYPES } from "~/utils/constants"

const createNewBoard = async (req, res, next) => {

  const schema = Joi.object({
    title: Joi.string().min(3).max(50).trim().strict().required(),
    description: Joi.string().min(5).max(200).trim().strict(),
    type: Joi.string().valid(BOARD_TYPES.PUBLIC, BOARD_TYPES.PRIVATE).required()
  })
  console.log('req:', req.body)

  try {
    await schema.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error.message))
  }
}

export const boardValidation = {
  createNewBoard
}