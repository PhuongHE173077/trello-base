import { StatusCodes } from "http-status-codes"
import { columnService } from "~/services/columnService"

const createNewColumn = async (req, res, next) => {

  try {
    const createBoard = await columnService.createNewColumn(req.body)

    res.status(StatusCodes.CREATED).json(createBoard)
  } catch (error) {
    next(error)
  }
}
export const columnController = {
  createNewColumn
}
