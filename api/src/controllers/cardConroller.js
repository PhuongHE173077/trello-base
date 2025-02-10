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

const update = async (req, res, next) => {

  try {
    const cardId = req.params.id

    const cardCoverFile = req.file

    const createBoard = await cardService.update(cardId, req.body, cardCoverFile)

    res.status(StatusCodes.CREATED).json(createBoard)
  } catch (error) {
    next(error)
  }
}
export const cardConroller = {
  createNewCard,
  update
}