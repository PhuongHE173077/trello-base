import { StatusCodes } from "http-status-codes"
import { cardService } from "~/services/cardService"

const createNewCard = async (req, res, next) => {

  try {
    const createBoard = await cardService.createNewCard(req.body)

    res.status(StatusCodes.CREATED).json(createBoard)
  } catch (error) {
    next(error)
  }
}


export const cardConroller = {
  createNewCard
}
